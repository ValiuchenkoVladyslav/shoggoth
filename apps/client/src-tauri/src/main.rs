#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod projects;
use projects::commands as prjs;

mod tools;
// use tools::commands as tls;

fn main() {
  tauri::Builder::default()
    .plugin(tauri_plugin_shell::init())
    .invoke_handler(tauri::generate_handler![
      prjs::get_projects,
      prjs::edit_meta,
      prjs::edit_graph,
      prjs::get_graph,
      prjs::create_project,
      prjs::delete_project,
    ])
    .run(tauri::generate_context!())
    .unwrap();
}
