use crate::common::{App, AppDirs};
use std::{os, path::PathBuf, process::Command};

pub fn infoga_dir(app: &App) -> PathBuf {
  app.tools_dir().join("phone_infoga")
}

pub fn infoga_path(app: &App) -> PathBuf {
  infoga_dir(app).join("phoneinfoga.exe")
}

pub fn run_infoga(app: &App, phone: String) -> Command {
  use os::windows::process::CommandExt;

  let mut cmd = Command::new(infoga_path(app));

  cmd.args(["scan", "-n", &phone]);
  cmd.creation_flags(0x08000000); // CREATE_NO_WINDOW

  cmd
}
