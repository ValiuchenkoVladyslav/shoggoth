//! https://github.com/sherlock-project/sherlock

mod utils {
  pub const APP_CMD: &str = "sherlock";
}

pub mod cmds {
  use super::utils::*;
  use crate::utils::*;

  #[command(rename_all = "snake_case")]
  pub async fn sherlock_install() -> CmdRes {
    cmd("pipx")
      .args(["install", "sherlock-project"])
      .spawn()?
      .wait()
      .await?;

    Ok(())
  }

  #[command(rename_all = "snake_case")]
  pub async fn sherlock_check() -> CmdRes<bool> {
    let output = cmd(APP_CMD).arg("--version").output().await?;

    let error_str = bytes_string(output.stderr);

    if !error_str.is_empty() {
      Err(AnyErr::msg(error_str))?;
    }

    Ok(true)
  }

  #[command(rename_all = "snake_case")]
  pub fn sherlock_search(nickname: &str) -> CmdRes {
    dbg!(&nickname);

    cmd(APP_CMD)
      .args([nickname, "--nsfw", "--browse"])
      .spawn()?;

    Ok(())
  }
}
