use crate::utils::CmdRes;

#[tauri::command(rename_all = "snake_case")]
pub fn browse(url: &str) -> CmdRes {
  open::that(url)?;

  Ok(())
}
