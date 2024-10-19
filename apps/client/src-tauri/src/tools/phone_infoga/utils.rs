use crate::utils::*;
use std::path::PathBuf;

schema!(InfogaRes (Default) {
  carrier: Option<String>,
  location: Option<String>,
});

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
