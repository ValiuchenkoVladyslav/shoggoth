// https://github.com/bellingcat/telegram-phone-number-checker

use crate::prelude::*;
use serde_json::from_slice;
use std::{collections::HashMap, fs, path::PathBuf, process::Stdio};
use tauri::{
  async_runtime::{block_on, spawn},
  Emitter, Listener,
};
use tokio::{
  io::{AsyncBufReadExt, AsyncWriteExt, BufReader},
  sync::Mutex,
  time::{sleep, Duration},
};

const APP_CMD: &str = "telegram-phone-number-checker";

pub fn get_cattg_dir(app: &App) -> PathBuf {
  app.tools_dir().join(APP_CMD)
}

#[tauri::command(rename_all = "snake_case")]
pub async fn cattg_install(app: App) -> CmdRes {
  cmd("pipx")
    .args(["install", APP_CMD])
    .spawn()?
    .wait()
    .await?;

  fs::create_dir_all(get_cattg_dir(&app))?;

  Ok(())
}

#[tauri::command(rename_all = "snake_case")]
pub async fn cattg_check() -> CmdRes {
  let output = cmd(APP_CMD).arg("--help").output().await?;

  let error_str = bytes_string(output.stderr);

  if !error_str.is_empty() {
    Err(AnyErr::msg(error_str))?;
  }

  Ok(())
}

schema!(CatPhone {
  id: Option<u64>,
  username: Option<String>,
  usernames: Option<Vec<String>>,
  first_name: Option<String>,
  last_name: Option<String>,
  fake: Option<bool>,
  verified: Option<bool>,
  premium: Option<bool>,
  bot: Option<bool>,
  restricted: Option<bool>,
  restricted_reason: Option<String>,
  user_was_online: Option<String>,
  phone: Option<String>,
});

#[tauri::command(rename_all = "snake_case")]
pub async fn cattg_phone(app: App, envs: [(&str, &str); 3], phone: &str) -> CmdRes<CatPhone> {
  let cat_dir = get_cattg_dir(&app);

  let mut cmd = cmd(APP_CMD)
    .envs(envs)
    .args(["--phone-numbers", phone])
    .current_dir(&cat_dir)
    .stderr(Stdio::piped())
    .stdin(Stdio::piped())
    .spawn()?;

  let stderr = cmd.stderr.take().ctx("Failed to get stderr")?;
  let stdin = Mutex::new(cmd.stdin.take().ctx("Failed to get stdin")?);

  let mut reader = BufReader::new(stderr).lines();

  let otp_waiter = spawn(async move {
    sleep(Duration::from_secs(4)).await;

    while let Ok(Some(line)) = reader.next_line().await {
      if !line.contains("/TcpFull complete!") {
        continue;
      }

      if app.emit("cat-otp-request", 0).is_err() {
        return;
      }

      app.listen_any("cat-otp", move |event| {
        block_on(async {
          let mut stdin = stdin.lock().await;

          let telegram_otp = event.payload();

          let _ = stdin.write(format!("{telegram_otp}\n").as_bytes()).await;
          let _ = stdin.flush().await;
        })
      });

      return;
    }
  });

  cmd.wait().await?;
  otp_waiter.abort();

  let res_file = fs::read(cat_dir.join("results.json"))?;

  let mut res: HashMap<String, CatPhone> = from_slice(&res_file)?;

  Ok(res.remove(phone).ctx("Phone not found")?)
}
