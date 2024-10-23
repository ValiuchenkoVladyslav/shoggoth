//! project file utils

mod utils;
use utils::*;

pub mod schemas;
use schemas::{DataGraph, ProjectBase, ProjectFull, ProjectMeta};

use crate::CtxExt;
use anyhow::Result;
use std::{
  fs::{read_dir, remove_file},
  path::PathBuf,
  time::{SystemTime, UNIX_EPOCH},
};

/// write project metadata to project file
/// * `dir` - projects dir path. It may differ on client & server
/// * `meta` - project metadata
pub fn write_meta(dir: PathBuf, meta: ProjectMeta) -> Result<()> {
  let proj_path = project_path(dir, &meta.id);

  let mut proj_data = read_project(&proj_path)?;
  proj_data.meta = meta;

  write_project(proj_path, &proj_data)
}

/// write project data objects to project file
/// * `dir` - projects dir path. It may differ on client & server
/// * `id` - project id
/// * `graph` - project graph data
pub fn write_graph(dir: PathBuf, id: &str, graph: DataGraph) -> Result<()> {
  let proj_path = project_path(dir, id);

  let mut proj_data = read_project(&proj_path)?;
  proj_data.graph = graph;

  write_project(proj_path, &proj_data)
}

/// read project graph from file
/// * `dir` - projects dir path. It may differ on client & server
/// * `id` - project id
pub fn read_graph(dir: PathBuf, id: &str) -> Result<DataGraph> {
  read_project(project_path(dir, id)).map(|data| data.graph)
}

/// read projects meta (get all projects)
/// * `dir` - projects dir path. It may differ on client & server
pub fn read_projects(dir: PathBuf) -> Result<Vec<ProjectMeta>> {
  let projects = read_dir(dir)
    .ctx("Failed to read projects directory")?
    .filter_map(|entry| {
      let file = entry.ok()?;

      file
        .file_name()
        .to_string_lossy()
        .ends_with(PROJECT_FILE_EXT)
        .then_some(read_project(file.path()).ok()?.meta)
    })
    .collect();

  Ok(projects)
}

/// create new project
/// * `dir` - projects dir path It may differ on client & server
/// * `base` - project base data
pub fn create_project(dir: PathBuf, base: ProjectBase) -> Result<ProjectMeta> {
  let time_now = SystemTime::now().duration_since(UNIX_EPOCH)?;

  let proj_data = ProjectFull {
    meta: ProjectMeta {
      id: format!(
        "{}.{}",
        &base.name.replace(" ", "-"),
        time_now.as_nanos() + Box::into_raw(Box::new(0)) as u128
      ),
      created_at: time_now.as_millis(),
      archived: false,
      base,
    },
    graph: Default::default(),
  };

  write_project(project_path(dir, &proj_data.meta.id), &proj_data)?;

  Ok(proj_data.meta)
}

/// delete project
/// * `dir` - projects dir path. It may differ on client & server
/// * `id` - project id
pub fn delete_project(dir: PathBuf, id: &str) -> Result<()> {
  remove_file(project_path(dir, id)).ctx("Failed to delete project")
}
