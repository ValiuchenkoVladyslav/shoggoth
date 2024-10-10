// https://github.com/sherlock-project/sherlock

use crate::utils::{AnyErr, CmdRes};

#[cfg(target_os = "windows")]
#[tauri::command(rename_all = "snake_case")]
pub fn sherlock_install() -> CmdRes {
  crate::utils::win_cmd("pip")
    .args(["install", "--user", "sherlock-project"])
    .spawn()?
    .wait()?;

  Ok(())
}

#[cfg(target_os = "windows")]
#[tauri::command(rename_all = "snake_case")]
pub fn sherlock_check() -> CmdRes<bool> {
  let cmd = crate::utils::win_cmd("python")
    .args(["-m", "sherlock_project", "--version"])
    .output()?;

  let error_str = String::from_utf8(cmd.stderr).map_err(AnyErr::from)?;

  if !error_str.is_empty() {
    Err(AnyErr::msg(error_str))?;
  }

  Ok(true)
}

#[cfg(target_os = "windows")]
#[tauri::command(rename_all = "snake_case")]
pub fn sherlock_search(nickname: &str) -> CmdRes {
  crate::utils::win_cmd("python") // todo no file
    .args(["-m", "sherlock_project", nickname, "--nsfw", "--browse"])
    .spawn()?;

  Ok(())
}
