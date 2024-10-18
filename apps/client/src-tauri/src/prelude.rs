use std::ffi::OsStr;
use tokio::process::Command;

// re-export common imports
pub use tauri::{AppHandle as App, Manager};

pub use crate::app_dirs::AppDirs;

pub use anyhow::Error as AnyErr;

pub use shogg_core::{schema, CtxExt};

/// utility to spawn a command (it won't open a cmd on windows)
pub fn cmd(cmd: impl AsRef<OsStr>) -> Command {
  let mut command = Command::new(cmd);

  #[cfg(target_os = "windows")]
  command.creation_flags(0x08000000); // CREATE_NO_WINDOW

  command
}

/// tauri command return type
pub type CmdRes<T = ()> = tauri::Result<T>;

/// `Vec<u8>` to `String`
pub fn bytes_string(bytes: Vec<u8>) -> String {
  std::str::from_utf8(&bytes).unwrap_or_default().into()
}
