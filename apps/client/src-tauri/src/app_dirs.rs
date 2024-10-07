use std::{fs, io, path::PathBuf};
use tauri::{AppHandle, Manager};

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

impl AppDirs for AppHandle {
  fn app_dir(&self) -> PathBuf {
    self
      .path()
      .app_data_dir()
      .expect("Failed to get app data dir")
  }
}
