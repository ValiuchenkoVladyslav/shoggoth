use crate::utils::{cmd, App, AppDirs};
use std::{path::PathBuf, process::Command};

pub fn infoga_dir(app: &App) -> PathBuf {
  app.tools_dir().join("phone_infoga")
}

pub fn infoga_path(app: &App) -> PathBuf {
  #[cfg(target_os = "windows")]
  return infoga_dir(app).join("phoneinfoga.exe");

  #[cfg(not(target_os = "windows"))]
  return infoga_dir(app).join("phoneinfoga");
}

pub fn run_infoga(app: &App, phone: &str) -> Command {
  let mut cmd = cmd(infoga_path(app));

  cmd.args(["scan", "-n", phone]);

  cmd
}
