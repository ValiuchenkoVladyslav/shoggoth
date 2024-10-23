use super::schemas::ProjectFull;
use crate::CtxExt;
use anyhow::Result;
use serde_json::{from_slice, to_vec};
use std::{
  fs::{read, write},
  path::{Path, PathBuf},
};

pub const PROJECT_FILE_EXT: &str = ".shogproj";

/// get project file path
/// * `dir` - projects dir path. It may differ on client & server
/// * `id` - project id
pub fn project_path(dir: impl AsRef<Path>, id: &str) -> PathBuf {
  dir.as_ref().join(id.to_owned() + PROJECT_FILE_EXT)
}

/// read project data from file
/// * `path` - project file path
pub fn read_project(path: impl AsRef<Path>) -> Result<ProjectFull> {
  let buffer = read(path.as_ref()).ctx("Failed to read project data")?;

  from_slice(&buffer).ctx("Failed to parse project data")
}

/// write project data to file
/// * `path` - project file path
/// * `data` - project data
pub fn write_project(path: impl AsRef<Path>, data: &ProjectFull) -> Result<()> {
  write(
    path.as_ref(),
    to_vec(data).ctx("Failed to serialize project data")?,
  )
  .ctx("Failed to write project data")
}
