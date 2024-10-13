// https://github.com/sherlock-project/sherlock

use crate::utils::{cmd, AnyErr, CmdRes};

#[tauri::command(rename_all = "snake_case")]
pub fn sherlock_install() -> CmdRes {
  cmd("pipx")
    .args(["install", "sherlock-project"])
    .spawn()?
    .wait()?;

  Ok(())
}

const APP_CMD: &str = "sherlock";

#[tauri::command(rename_all = "snake_case")]
pub fn sherlock_check() -> CmdRes<bool> {
  let output = cmd(APP_CMD).arg("--version").output()?;

  let error_str = String::from_utf8(output.stderr).map_err(AnyErr::from)?;

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
