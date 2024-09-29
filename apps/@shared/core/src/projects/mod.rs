pub mod utils;

use crate::types::{DataGraph, ProjectBase, ProjectFull, ProjectMeta};
use std::{
  fs::{read_dir, remove_file},
  path::PathBuf,
  time::{SystemTime, UNIX_EPOCH},
};
use utils::{project_path, read_project, write_project, PROJECT_FILE_EXT};

/// write project metadata to project file
/// * `dir` - path to projects directory. It may be different on client & server
/// * `meta` - project metadata
pub fn write_meta(dir: PathBuf, meta: ProjectMeta) -> Result<(), String> {
  let proj_path = project_path(dir, &meta.id);

  let mut proj_data = read_project(&proj_path)?;
  proj_data.meta = meta;

  write_project(proj_path, &proj_data)
}

/// write project data objects to project file
/// * `dir` - path to projects directory. It may be different on client & server
/// * `id` - project id
/// * `graph` - project graph data
pub fn write_graph(dir: PathBuf, id: impl Into<String>, graph: DataGraph) -> Result<(), String> {
  let proj_path = project_path(dir, id);

  let mut proj_data = read_project(&proj_path)?;
  proj_data.graph = graph;

  write_project(proj_path, &proj_data)
}

/// read project graph from file
/// * `dir` - path to projects directory. It may be different on client & server
/// * `id` - project id
pub fn read_graph(dir: PathBuf, id: impl Into<String>) -> Result<DataGraph, String> {
  read_project(project_path(dir, id)).map(|data| data.graph)
}

/// read projects meta (get all projects)
/// * `dir` - path to projects directory. It may be different on client & server
pub fn read_projects(dir: PathBuf) -> Vec<ProjectMeta> {
  read_dir(dir)
    .expect("Failed to read projects directory")
    .filter_map(|entry| {
      let file = entry.ok()?;

      file
        .file_name()
        .to_string_lossy()
        .ends_with(PROJECT_FILE_EXT)
        .then_some(read_project(file.path()).ok()?.meta)
    })
    .collect()
}

/// create new project
/// * `dir` - path to projects directory. It may be different on client & server
/// * `base` - project base data
pub fn create_project(dir: PathBuf, base: ProjectBase) -> Result<ProjectMeta, String> {
  let created_at = SystemTime::now()
    .duration_since(UNIX_EPOCH)
    .expect("Time went backwards")
    .as_millis();

  let proj_data = ProjectFull {
    meta: ProjectMeta {
      id: format!("{created_at}-{}-{}", rand::random::<u32>(), &base.name),
      archived: false,
      created_at,
      base,
    },
    graph: Default::default(),
  };

  write_project(project_path(dir, &proj_data.meta.id), &proj_data)?;

  Ok(proj_data.meta)
}

/// delete project
/// * `dir` - path to projects directory. It may be different on client & server
/// * `id` - project id
pub fn delete_project(dir: PathBuf, id: impl Into<String>) -> Result<(), String> {
  remove_file(project_path(dir, id)).map_err(|e| format!("Failed to delete project: {}", e))
}
