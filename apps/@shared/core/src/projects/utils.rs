use crate::types::ProjectFull;
use anyhow::{Context, Result};
use serde_json::{from_slice, to_vec};
use std::{
  fs::{create_dir_all, read, write},
  path::{Path, PathBuf},
};

pub const PROJECT_FILE_EXT: &str = ".shogproj";

/// get path to projects directory
/// * `app_dir` - path to app data directory. It may be different on client & server
pub fn projects_path(app_dir: impl AsRef<Path>) -> PathBuf {
  let path = app_dir.as_ref().join("projects");

  // or create if it doesn't exist
  create_dir_all(&path).expect("Failed to create projects directory");

  path
}

/// get project file path
/// * `dir` - path to projects directory. It's different on client & server
/// * `id` - project id
pub fn project_path(dir: impl AsRef<Path>, id: impl Into<String>) -> PathBuf {
  dir.as_ref().join(id.into() + PROJECT_FILE_EXT)
}

/// read project data from file
/// * `path` - path to project file
pub fn read_project(path: impl AsRef<Path>) -> Result<ProjectFull> {
  let buffer = read(path.as_ref()).context("Failed to read project data")?;

  from_slice(&buffer).context("Failed to parse project data")
}

/// write project data to file
/// * `path` - path to project file
/// * `data` - project data
pub fn write_project(path: impl AsRef<Path>, data: &ProjectFull) -> Result<()> {
  write(
    path.as_ref(),
    to_vec(data).context("Failed to serialize project data")?,
  )
  .context("Failed to write project data")
}
