// re-export common imports
pub use tauri::{AppHandle as App, Manager, Result as CmdRes};

pub use crate::app_dirs::AppDirs;

pub use serde::{Deserialize, Serialize};
pub use ts_rs::TS;

pub use anyhow::Error as AnyErr;

// windows utility
use std::{ffi::OsStr, os, process::Command};

#[cfg(target_os = "windows")]
pub fn win_cmd(cmd: impl AsRef<OsStr>) -> Command {
  use os::windows::process::CommandExt;

  let mut cmd = Command::new(cmd);
  cmd.creation_flags(0x08000000); // CREATE_NO_WINDOW

  cmd
}
