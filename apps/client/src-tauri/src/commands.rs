use crate::utils::CmdRes;

#[tauri::command]
pub fn open_browser(url: String) -> CmdRes<()> {
  open::that(url)?;

  Ok(())
}
