// https://github.com/sundowndev/phoneinfoga

mod utils;

use std::{
  fs::{self, File},
  io::Write,
};

use flate2::read::GzDecoder;
use futures_util::StreamExt;
use tar::Archive;

use crate::common::{AnyErr, App, CmdRes, Deserialize, Serialize, TS};

#[tauri::command(rename_all = "snake_case")]
pub async fn infoga_install(app: App) -> CmdRes<()> {
  let dir = utils::infoga_dir(&app);

  fs::create_dir_all(&dir)?;

  // download archive
  let mut res_stream = reqwest::Client::new().get(
    "https://github.com/sundowndev/phoneinfoga/releases/download/v2.11.0/phoneinfoga_Windows_x86_64.tar.gz"
  )
    .send()
    .await
    .map_err(Into::<AnyErr>::into)?
    .bytes_stream();

  let archive_path = dir.join("infoga_archive");

  let mut infoga_archive = File::create(&archive_path)?;

  while let Some(chunk) = res_stream.next().await {
    infoga_archive.write_all(&chunk.map_err(Into::<AnyErr>::into)?)?;
  }

  // unpack archive
  Archive::new(GzDecoder::new(File::open(&archive_path)?)).unpack(dir)?;

  // remove archive
  fs::remove_file(archive_path)?;

  Ok(())
}

#[tauri::command(rename_all = "snake_case")]
pub fn infoga_check(app: App) -> bool {
  utils::infoga_path(&app).exists()
}

#[derive(Default, TS, Serialize, Deserialize)]
#[ts(export)]
pub struct InfogaRes {
  carrier: Option<String>,
  location: Option<String>,
  country: Option<String>,
}

#[tauri::command(rename_all = "snake_case")]
pub fn infoga_scan(app: App, phone: String) -> CmdRes<InfogaRes> {
  const CARRIER_PREFIX: &str = "Carrier: ";
  const COUNTRY_PREFIX: &str = "Country: ";
  const LOCATION_PREFIX: &str = "Location: ";

  let cmd = utils::run_infoga(&app, phone).output()?;

  let output_str = String::from_utf8(cmd.stdout).map_err(Into::<AnyErr>::into)?;

  let mut infoga_res = InfogaRes::default();

  for col in output_str.split("\n").collect::<Vec<&str>>() {
    if col.starts_with(CARRIER_PREFIX) {
      infoga_res.carrier = col.split(CARRIER_PREFIX).last().map(Into::into);
    } else if col.starts_with(LOCATION_PREFIX) {
      infoga_res.location = col.split(LOCATION_PREFIX).last().map(Into::into);
    } else if col.starts_with(COUNTRY_PREFIX) {
      infoga_res.country = col.split(COUNTRY_PREFIX).last().map(Into::into);
    }
  }

  Ok(infoga_res)
}

#[tauri::command(rename_all = "snake_case")]
pub fn infoga_urls(app: App, phone: String) -> CmdRes<()> {
  const URL_PREFIX: &str = "URL: ";

  let cmd = utils::run_infoga(&app, phone).output()?;

  let output_str = String::from_utf8(cmd.stdout).map_err(Into::<AnyErr>::into)?;

  for col in output_str.split("\n").collect::<Vec<&str>>() {
    if col.trim().starts_with(URL_PREFIX) {
      col.split(URL_PREFIX).last().map(open::that);
    }
  }

  Ok(())
}
