// re-export common imports
pub use tauri::{AppHandle as App, Manager};

pub use crate::app_dirs::AppDirs;

pub use anyhow::Error as AnyErr;

pub use shogg_core::schema;

// windows utility
use std::{ffi::OsStr, os, process::Command};

#[cfg(target_os = "windows")]
pub fn win_cmd(cmd: impl AsRef<OsStr>) -> Command {
  use os::windows::process::CommandExt;

  let mut cmd = Command::new(cmd);
  cmd.creation_flags(0x08000000); // CREATE_NO_WINDOW

  cmd
}

/// tauri command return utility type
pub type CmdRes<T = ()> = tauri::Result<T>;
