use crate::utils::CmdRes;

#[tauri::command]
pub fn browse(url: &str) -> CmdRes {
  open::that(url)?;

  Ok(())
}
