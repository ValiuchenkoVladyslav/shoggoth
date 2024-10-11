// https://github.com/sherlock-project/sherlock

use crate::utils::{self, AnyErr, CmdRes};
use std::process::Command;

#[tauri::command(rename_all = "snake_case")]
pub fn sherlock_install() -> CmdRes {
  let mut cmd = if cfg!(target_os = "windows") {
    utils::win_cmd("pip")
  } else {
    Command::new("pip")
  };

  cmd
    .args(["install", "--user", "sherlock-project"])
    .spawn()?
    .wait()?;

  Ok(())
}

#[tauri::command(rename_all = "snake_case")]
pub fn sherlock_check() -> CmdRes<bool> {
  let mut cmd = if cfg!(target_os = "windows") {
    utils::win_cmd("python")
  } else {
    Command::new("python")
  };

  cmd.args(["-m", "sherlock_project", "--version"]);

  let error_str = String::from_utf8(cmd.output()?.stderr).map_err(AnyErr::from)?;

  if !error_str.is_empty() {
    Err(AnyErr::msg(error_str))?;
  }

  Ok(true)
}

#[tauri::command(rename_all = "snake_case")]
pub fn sherlock_search(nickname: &str) -> CmdRes {
  let mut cmd = if cfg!(target_os = "windows") {
    utils::win_cmd("python")
  } else {
    Command::new("python")
  };

  cmd
    .args(["-m", "sherlock_project", nickname, "--nsfw", "--browse"])
    .spawn()?;

  Ok(())
}
