use crate::utils::{App, AppDirs};
use std::{path::PathBuf, process::Command};

pub fn infoga_dir(app: &App) -> PathBuf {
  app.tools_dir().join("phone_infoga")
}

#[cfg(target_os = "windows")]
pub fn infoga_path(app: &App) -> PathBuf {
  infoga_dir(app).join("phoneinfoga.exe")
}

#[cfg(target_os = "windows")]
pub fn run_infoga(app: &App, phone: &str) -> Command {
  let mut cmd = crate::utils::win_cmd(infoga_path(app));

  cmd.args(["scan", "-n", phone]);

  cmd
}
