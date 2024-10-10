// https://github.com/sundowndev/phoneinfoga

mod utils;

use flate2::read::GzDecoder;
use tar::Archive;

use crate::utils::{schema, AnyErr, App, CmdRes};

#[tauri::command(rename_all = "snake_case")]
pub async fn infoga_install(app: App) -> CmdRes {
  let dir = utils::infoga_dir(&app);

  std::fs::create_dir_all(&dir)?;

  let res_archive = reqwest::Client::new().get(
    "https://github.com/sundowndev/phoneinfoga/releases/download/v2.11.0/phoneinfoga_Windows_x86_64.tar.gz"
  )
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
pub fn infoga_scan(app: App, phone: &str) -> CmdRes<InfogaRes> {
  const CARRIER_PREFIX: &str = "Carrier: ";
  const LOCATION_PREFIX: &str = "Location: ";

  let cmd = utils::run_infoga(&app, phone).output()?;

  let output_str = String::from_utf8(cmd.stdout).map_err(AnyErr::from)?;

  let mut infoga_res = InfogaRes::default();

  for col in output_str.split("\n").collect::<Vec<&str>>() {
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

  let cmd = utils::run_infoga(&app, phone).output()?;

  let output_str = String::from_utf8(cmd.stdout).map_err(AnyErr::from)?;

  for col in output_str.split("\n").collect::<Vec<&str>>() {
    if col.trim().starts_with(URL_PREFIX) {
      col.split(URL_PREFIX).last().map(open::that);
    }
  }

  Ok(())
}
