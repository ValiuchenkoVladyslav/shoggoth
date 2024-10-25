//! api to allow interaction with external tools

pub mod utils {
  use crate::utils::AppState;
  use serde::Serialize;
  use serde_json::{to_string, Result};
  use shogg_core::schema;

  pub type HttpRes = actix_web::HttpResponse;

  schema!(TmpNode (Clone) {
    id: u128,
    data: String,
    r#type: String,
  });

  impl TmpNode {
    pub fn new<T: ?Sized + Serialize>(data: &T, typ: &str) -> Result<Self> {
      Ok(Self {
        id: Box::into_raw(Box::new(0)) as u128,
        data: to_string(data)?,
        r#type: typ.into(),
      })
    }
  }

  pub fn emit_node(app: AppState, event: &str, node: TmpNode) -> HttpRes {
    use tauri::Emitter;

    if app.emit(event, node).is_ok() {
      return HttpRes::Ok().finish();
    }

    HttpRes::InternalServerError().body("Failed to emit temporary node")
  }
}

mod routes {
  use super::utils::*;
  use crate::utils::AppState;
  use actix_web::{get, post, web::Json};
  use shogg_core::projects::schemas::node_types::{Nickname, Url};

  #[get("/")]
  pub async fn status() -> HttpRes {
    HttpRes::Ok().finish()
  }

  #[post("/add-url")]
  pub async fn add_url(app: AppState, data: Json<Url>) -> HttpRes {
    match TmpNode::new(&data, "url") {
      Ok(tmp_url) => emit_node(app, "add-url", tmp_url),
      _ => HttpRes::BadRequest().body("Failed to serialize the URL"),
    }
  }

  #[post("/add-nickname")]
  pub async fn add_nickname(app: AppState, data: Json<Nickname>) -> HttpRes {
    match TmpNode::new(&data, "nickname") {
      Ok(tmp_nickname) => emit_node(app, "add-nickname", tmp_nickname),
      _ => HttpRes::BadRequest().body("Failed to serialize the nickname"),
    }
  }
}

use crate::utils::{AnyErr, App, CtxExt};
use actix_web::{web, App as ActixApp, HttpServer};
use routes::*;

pub fn run_server(app: &App) -> Result<(), AnyErr> {
  let server_data = web::Data::new(app.clone());

  let server = HttpServer::new(move || {
    ActixApp::new()
      .wrap(actix_cors::Cors::permissive())
      .app_data(server_data.clone())
      .service(status)
      .service(add_url)
      .service(add_nickname)
  })
  .bind("127.0.0.1:2099")
  .ctx("Failed to bind a server")?
  .disable_signals()
  .run();

  tauri::async_runtime::spawn(server);

  Ok(())
}
