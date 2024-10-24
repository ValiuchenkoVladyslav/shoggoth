//! general purpose commands

use crate::utils::*;

#[command(rename_all = "snake_case")]
pub fn browse(url: &str) -> CmdRes {
  open::that(url)?;

  Ok(())
}
