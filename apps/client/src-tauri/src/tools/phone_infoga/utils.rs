use crate::utils::{self, App, AppDirs};
use std::{path::PathBuf, process::Command};

pub fn infoga_dir(app: &App) -> PathBuf {
  app.tools_dir().join("phone_infoga")
}

pub fn infoga_path(app: &App) -> PathBuf {
  if cfg!(target_os = "windows") {
    infoga_dir(app).join("phoneinfoga.exe")
  } else {
    infoga_dir(app).join("phoneinfoga")
  }
}

pub fn run_infoga(app: &App, phone: &str) -> Command {
  let mut cmd = if cfg!(target_os = "windows") {
    utils::win_cmd(infoga_path(app))
  } else {
    Command::new(infoga_path(app))
  };

  cmd.args(["scan", "-n", phone]);

  cmd
}
