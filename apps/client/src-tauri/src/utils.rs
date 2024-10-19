use std::{ffi::OsStr, fs, io, path::PathBuf};
use tokio::process::Command;

// re-export common imports
pub use anyhow::Error as AnyErr;
pub use shogg_core::{schema, CtxExt};
pub use tauri::{AppHandle as App, Manager};

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

/// `tauri::AppHandle` extension for app utility dirs
pub trait AppDirs {
  fn app_dir(&self) -> PathBuf;

  fn projects_dir(&self) -> PathBuf {
    self.app_dir().join("projects")
  }

  fn tools_dir(&self) -> PathBuf {
    self.app_dir().join("tools")
  }

  fn create_app_dirs(&self) -> io::Result<()> {
    fs::create_dir_all(self.projects_dir())?;
    fs::create_dir_all(self.tools_dir())?;

    Ok(())
  }
}

impl AppDirs for App {
  fn app_dir(&self) -> PathBuf {
    self
      .path()
      .app_data_dir()
      .expect("Failed to get app data dir")
  }
}
