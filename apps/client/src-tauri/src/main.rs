#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod api;
mod commands;
mod extension;

mod utils;
use utils::{AppDirs, Manager};

mod projects;
use projects as prjs;

mod tools;
use tools as tls;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      commands::browse,
      // projects
      prjs::get_projects,
      prjs::edit_meta,
      prjs::edit_graph,
      prjs::get_graph,
      prjs::create_project,
      prjs::delete_project,
      // phone infoga
      tls::phone_infoga::cmds::infoga_install,
      tls::phone_infoga::cmds::infoga_check,
      tls::phone_infoga::cmds::infoga_scan,
      tls::phone_infoga::cmds::infoga_urls,
      // sherlock
      tls::sherlock::cmds::sherlock_install,
      tls::sherlock::cmds::sherlock_check,
      tls::sherlock::cmds::sherlock_search,
      // bellingcat telegram phone checker
      tls::bellingcat_tg::cmds::cattg_install,
      tls::bellingcat_tg::cmds::cattg_check,
      tls::bellingcat_tg::cmds::cattg_phone,
    ])
    .setup(|app| {
      app.app_handle().create_app_dirs()?;

      api::run_server(app.handle())?;

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("Failed to start the app!");
}
