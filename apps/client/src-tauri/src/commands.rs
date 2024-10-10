use crate::utils::CmdRes;

#[tauri::command]
pub fn browse(url: String) -> CmdRes {
  open::that(url)?;

  Ok(())
}
