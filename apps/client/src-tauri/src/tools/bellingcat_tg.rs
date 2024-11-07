//! https://github.com/bellingcat/telegram-phone-number-checker

mod utils {
  use crate::utils::*;
  use std::path::PathBuf;

  pub const APP_CMD: &str = "telegram-phone-number-checker";

  pub fn cattg_dir(app: &App) -> PathBuf {
    app.tools_dir().join(APP_CMD)
  }

  schema!(CatPhone {
    id?: u64,
    username?: String,
    usernames?: Vec<String>,
    first_name?: String,
    last_name?: String,
    fake?: bool,
    verified?: bool,
    premium?: bool,
    bot?: bool,
    restricted?: bool,
    restricted_reason?: String,
    user_was_online?: String,
    phone?: String,
  });
}

pub mod cmds {
  use super::utils::*;
  use crate::utils::*;

  use serde_json::from_slice;
  use std::{collections::HashMap, fs, process::Stdio};
  use tauri::{
    async_runtime::{block_on, spawn},
    Emitter, Listener,
  };
  use tokio::{
    io::{AsyncBufReadExt, AsyncWriteExt, BufReader},
    sync::Mutex,
    time::{sleep, Duration},
  };

  #[command(rename_all = "snake_case")]
  pub async fn cattg_install(app: App) -> CmdRes {
    cmd("git") // installing with pipx is unreliable
      .args([
        "clone",
        "--depth",
        "1",
        "--branch",
        "main",
        "https://github.com/bellingcat/telegram-phone-number-checker.git",
      ])
      .current_dir(app.tools_dir())
      .spawn()?
      .wait()
      .await?;

    cmd("pip")
      .args(["install", "-r", "requirements.txt"])
      .current_dir(cattg_dir(&app))
      .spawn()?
      .wait()
      .await?;

    Ok(())
  }

  #[command(rename_all = "snake_case")]
  pub async fn cattg_check(app: App) -> CmdRes<bool> {
    Ok(fs::exists(cattg_dir(&app).join("pyproject.toml"))?)
  }

  #[command(rename_all = "snake_case")]
  pub async fn cattg_phone(app: App, envs: [(&str, &str); 3], phone: &str) -> CmdRes<CatPhone> {
    let cat_dir = cattg_dir(&app);

    let mut cmd = cmd("python")
      .args(["main.py", "--phone-numbers", phone])
      .current_dir(cat_dir.join("telegram_phone_number_checker"))
      .envs(envs)
      .stderr(Stdio::piped())
      .stdin(Stdio::piped())
      .spawn()?;

    let stderr = cmd.stderr.take().ctx("Failed to get stderr")?;
    let stdin = Mutex::new(cmd.stdin.take().ctx("Failed to get stdin")?);

    let otp_waiter = spawn(async move {
      sleep(Duration::from_secs(4)).await;

      let mut reader = BufReader::new(stderr).lines();

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

            if stdin
              .write_all(format!("{telegram_otp}\n").as_bytes())
              .await
              .is_ok()
            {
              let _ = stdin.flush().await;
            }
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
}
