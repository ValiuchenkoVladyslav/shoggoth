use crate::common::CmdRes;

#[tauri::command]
pub fn open_browser(url: String) -> CmdRes<()> {
  open::that(url)?;

  Ok(())
}
