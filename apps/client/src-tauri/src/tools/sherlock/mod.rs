// https://github.com/sherlock-project/sherlock

use crate::common::{AnyErr, CmdRes};
use std::{os, process::Command};

#[tauri::command(rename_all = "snake_case")]
pub fn sherlock_install() -> CmdRes<()> {
  use os::windows::process::CommandExt;

  Command::new("pip")
    .args(["install", "--user", "sherlock-project"])
    .creation_flags(0x08000000) // CREATE_NO_WINDOW
    .spawn()?
    .wait()?;

  Ok(())
}

#[tauri::command(rename_all = "snake_case")]
pub fn sherlock_check() -> CmdRes<bool> {
  use os::windows::process::CommandExt;

  let cmd = Command::new("python")
    .args(["-m", "sherlock_project", "--version"])
    .creation_flags(0x08000000) // CREATE_NO_WINDOW
    .output()?;

  let error_str = String::from_utf8(cmd.stderr).map_err(AnyErr::from)?;

  if !error_str.is_empty() {
    return Err(AnyErr::msg(error_str).into());
  }

  Ok(true)
}

#[tauri::command(rename_all = "snake_case")]
pub fn sherlock_search(nickname: String) -> CmdRes<()> {
  use os::windows::process::CommandExt;

  Command::new("python") // todo no file
    .args(["-m", "sherlock_project", &nickname, "--nsfw", "--browse"])
    .creation_flags(0x08000000) // CREATE_NO_WINDOW
    .spawn()?;

  Ok(())
}
