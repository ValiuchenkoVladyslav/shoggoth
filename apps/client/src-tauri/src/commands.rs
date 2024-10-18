use crate::prelude::CmdRes;

#[tauri::command]
pub fn browse(url: &str) -> CmdRes {
  open::that(url)?;

  Ok(())
}
