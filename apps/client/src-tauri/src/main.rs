#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod projects;
use projects::tauri_commands as proj_cmds;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      proj_cmds::get_projects,
      proj_cmds::edit_meta,
      proj_cmds::edit_graph,
      proj_cmds::get_graph,
      proj_cmds::create_project,
      proj_cmds::delete_project,
    ])
    .run(tauri::generate_context!())
    .unwrap();
}
