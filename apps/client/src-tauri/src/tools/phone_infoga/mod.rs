// https://github.com/sundowndev/phoneinfoga

mod utils;

use flate2::read::GzDecoder;
use tar::Archive;

use crate::utils::{bytes_to_str, schema, AnyErr, App, CmdRes};

#[tauri::command(rename_all = "snake_case")]
pub async fn infoga_install(app: App) -> CmdRes {
  let dir = utils::infoga_dir(&app);

  std::fs::create_dir_all(&dir)?;

  const DOWNLOAD_URL: &str = if cfg!(target_os = "windows") {
    "https://github.com/sundowndev/phoneinfoga/releases/download/v2.11.0/phoneinfoga_Windows_x86_64.tar.gz"
  } else {
    "https://github.com/sundowndev/phoneinfoga/releases/download/v2.11.0/phoneinfoga_Linux_x86_64.tar.gz"
  };

  let res_archive = reqwest::Client::new()
    .get(DOWNLOAD_URL)
    .send()
    .await
    .map_err(AnyErr::from)?
    .bytes()
    .await
    .map_err(AnyErr::from)?;

  Archive::new(GzDecoder::new(&res_archive[..])).unpack(dir)?;

  Ok(())
}

#[tauri::command(rename_all = "snake_case")]
pub fn infoga_check(app: App) -> bool {
  utils::infoga_path(&app).exists()
}

schema!(InfogaRes (Default) {
  carrier: Option<String>,
  location: Option<String>,
});

#[tauri::command(rename_all = "snake_case")]
pub fn infoga_scan(app: App, envs: [(&str, &str); 4], phone: &str) -> CmdRes<InfogaRes> {
  const CARRIER_PREFIX: &str = "Carrier: ";
  const LOCATION_PREFIX: &str = "Location: ";

  let output = utils::run_infoga(&app, phone).envs(envs).output()?;

  let mut infoga_res = InfogaRes::default();

  for col in bytes_to_str(output.stdout).split("\n") {
    if col.starts_with(CARRIER_PREFIX) {
      infoga_res.carrier = col.split(CARRIER_PREFIX).last().map(Into::into);
    } else if col.starts_with(LOCATION_PREFIX) {
      infoga_res.location = col.split(LOCATION_PREFIX).last().map(Into::into);
    }
  }

  Ok(infoga_res)
}

#[tauri::command(rename_all = "snake_case")]
pub fn infoga_urls(app: App, phone: &str) -> CmdRes {
  const URL_PREFIX: &str = "URL: ";

  let output = utils::run_infoga(&app, phone).output()?;

  for col in bytes_to_str(output.stdout).split("\n") {
    if col.trim().starts_with(URL_PREFIX) {
      col.split(URL_PREFIX).last().map(open::that);
    }
  }

  Ok(())
}
