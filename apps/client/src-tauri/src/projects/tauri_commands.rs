use shogg_core::{
  projects,
  types::{DataGraph, ProjectBase, ProjectMeta},
};
use tauri::{AppHandle, Manager};

fn projects_dir(handle: &AppHandle) -> std::path::PathBuf {
  projects::utils::projects_path(
    handle
      .path()
      .app_data_dir()
      .expect("Failed to get app data dir"),
  )
}

#[tauri::command(rename_all = "snake_case")]
pub fn get_projects(handle: AppHandle) -> Vec<ProjectMeta> {
  projects::read_projects(projects_dir(&handle))
}

#[tauri::command(rename_all = "snake_case")]
pub fn edit_meta(handle: AppHandle, meta: ProjectMeta) -> Result<(), String> {
  projects::write_meta(projects_dir(&handle), meta)
}

#[tauri::command(rename_all = "snake_case")]
pub fn edit_graph(handle: AppHandle, id: &str, graph: DataGraph) -> Result<(), String> {
  projects::write_graph(projects_dir(&handle), id, graph)
}

#[tauri::command(rename_all = "snake_case")]
pub fn get_graph(handle: AppHandle, id: &str) -> Result<DataGraph, String> {
  projects::read_graph(projects_dir(&handle), id)
}

#[tauri::command(rename_all = "snake_case")]
pub fn create_project(handle: AppHandle, project_base: ProjectBase) -> Result<ProjectMeta, String> {
  projects::create_project(projects_dir(&handle), project_base)
}

#[tauri::command(rename_all = "snake_case")]
pub fn delete_project(handle: AppHandle, id: &str) -> Result<(), String> {
  projects::delete_project(projects_dir(&handle), id)
}
