use shogg_core::{
  projects,
  types::{DataGraph, ProjectBase, ProjectMeta},
};
use tauri::{AppHandle, Manager};

fn projects_dir(app: &AppHandle) -> std::path::PathBuf {
  projects::utils::projects_path(
    app
      .path()
      .app_data_dir()
      .expect("Failed to get app data dir"),
  )
}

#[tauri::command(rename_all = "snake_case")]
pub fn get_projects(app: AppHandle) -> Result<Vec<ProjectMeta>, String> {
  projects::read_projects(projects_dir(&app)).map_err(|e| e.to_string())
}

#[tauri::command(rename_all = "snake_case")]
pub fn edit_meta(app: AppHandle, meta: ProjectMeta) -> Result<(), String> {
  projects::write_meta(projects_dir(&app), meta).map_err(|e| e.to_string())
}

#[tauri::command(rename_all = "snake_case")]
pub fn edit_graph(app: AppHandle, id: &str, graph: DataGraph) -> Result<(), String> {
  projects::write_graph(projects_dir(&app), id, graph).map_err(|e| e.to_string())
}

#[tauri::command(rename_all = "snake_case")]
pub fn get_graph(app: AppHandle, id: &str) -> Result<DataGraph, String> {
  projects::read_graph(projects_dir(&app), id).map_err(|e| e.to_string())
}

#[tauri::command(rename_all = "snake_case")]
pub fn create_project(app: AppHandle, project_base: ProjectBase) -> Result<ProjectMeta, String> {
  projects::create_project(projects_dir(&app), project_base).map_err(|e| e.to_string())
}

#[tauri::command(rename_all = "snake_case")]
pub fn delete_project(app: AppHandle, id: &str) -> Result<(), String> {
  projects::delete_project(projects_dir(&app), id).map_err(|e| e.to_string())
}
