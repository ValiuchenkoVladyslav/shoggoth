// https://github.com/sherlock-project/sherlock

use crate::prelude::*;

#[tauri::command(rename_all = "snake_case")]
pub async fn sherlock_install() -> CmdRes {
  cmd("pipx")
    .args(["install", "sherlock-project"])
    .spawn()?
    .wait()
    .await?;

  Ok(())
}

const APP_CMD: &str = "sherlock";

#[tauri::command(rename_all = "snake_case")]
pub async fn sherlock_check() -> CmdRes<bool> {
  let output = cmd(APP_CMD).arg("--version").output().await?;

  let error_str = bytes_string(output.stderr);

  if !error_str.is_empty() {
    Err(AnyErr::msg(error_str))?;
  }

  Ok(true)
}

#[tauri::command(rename_all = "snake_case")]
pub fn sherlock_search(nickname: &str) -> CmdRes {
  cmd(APP_CMD)
    .args([nickname, "--nsfw", "--browse"])
    .spawn()?;

  Ok(())
}
