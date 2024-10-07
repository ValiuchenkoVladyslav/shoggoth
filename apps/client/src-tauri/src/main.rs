#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod app_dirs;

mod common;
use common::{AppDirs, Manager};

mod projects;
use projects::commands as prjs;

mod tools;
use tools as tls;

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
      tls::phone_infoga::infoga_install,
      tls::phone_infoga::infoga_check,
      tls::phone_infoga::infoga_scan,
      tls::phone_infoga::infoga_urls,
    ])
    .setup(|app| {
      app.app_handle().create_app_dirs()?;

      Ok(())
    })
    .run(tauri::generate_context!())
    .unwrap();
}
