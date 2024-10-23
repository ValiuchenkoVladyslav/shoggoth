//! https://github.com/sundowndev/phoneinfoga/

mod utils {
  use crate::utils::*;
  use std::path::PathBuf;

  pub fn infoga_dir(app: &App) -> PathBuf {
    app.tools_dir().join("phone_infoga")
  }

  pub fn infoga_path(app: &App) -> PathBuf {
    infoga_dir(app).join(if cfg!(target_os = "windows") {
      "phoneinfoga.exe"
    } else {
      "phoneinfoga"
    })
  }

  pub fn run_infoga(app: &App, phone: &str) -> tokio::process::Command {
    let mut cmd = cmd(infoga_path(app));

    cmd.args(["scan", "-n", phone]);

    cmd
  }
}

pub mod cmds {
  use super::utils::*;
  use crate::utils::*;

  use flate2::read::GzDecoder;
  use shogg_core::projects::schemas::node_types::Phone;
  use tar::Archive;

  #[command(rename_all = "snake_case")]
  pub async fn infoga_install(app: App) -> CmdRes {
    let dir = infoga_dir(&app);

    std::fs::create_dir_all(&dir)?;

    let res_archive = reqwest::Client::new()
    .get(
      if cfg!(target_os = "windows") {
        "https://github.com/sundowndev/phoneinfoga/releases/download/v2.11.0/phoneinfoga_Windows_x86_64.tar.gz"
      } else {
        "https://github.com/sundowndev/phoneinfoga/releases/download/v2.11.0/phoneinfoga_Linux_x86_64.tar.gz"
      }
    )
    .send()
    .await
    .ctx("Failed to get download link")?
    .bytes()
    .await
    .ctx("Failed to download archive")?;

    Archive::new(GzDecoder::new(&res_archive[..])).unpack(dir)?;

    Ok(())
  }

  #[command(rename_all = "snake_case")]
  pub fn infoga_check(app: App) -> bool {
    infoga_path(&app).exists()
  }

  #[command(rename_all = "snake_case")]
  pub async fn infoga_scan(app: App, envs: [(&str, &str); 4], phone: &str) -> CmdRes<Phone> {
    const CARRIER_PREFIX: &str = "Carrier: ";
    const LOCATION_PREFIX: &str = "Location: ";

    let output = run_infoga(&app, phone).envs(envs).output().await?;

    let mut infoga_res = Phone::default();

    for col in bytes_string(output.stdout).split("\n") {
      if col.starts_with(CARRIER_PREFIX) {
        infoga_res.carrier = col.split(CARRIER_PREFIX).last().map(Into::into);
      } else if col.starts_with(LOCATION_PREFIX) {
        infoga_res.location = col.split(LOCATION_PREFIX).last().map(Into::into);
      }
    }

    Ok(infoga_res)
  }

  #[command(rename_all = "snake_case")]
  pub async fn infoga_urls(app: App, phone: &str) -> CmdRes {
    const URL_PREFIX: &str = "URL: ";

    let output = run_infoga(&app, phone).output().await?;

    for col in bytes_string(output.stdout).split("\n") {
      if col.trim().starts_with(URL_PREFIX) {
        col.split(URL_PREFIX).last().map(open::that);
      }
    }

    Ok(())
  }
}
