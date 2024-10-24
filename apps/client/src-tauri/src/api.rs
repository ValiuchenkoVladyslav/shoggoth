//! api to allow interaction with browser extension

pub mod utils {
  use crate::utils::AppState;
  use shogg_core::schema;

  pub type HttpRes = actix_web::HttpResponse;
  pub use actix_web::Responder as ApiRes;

  schema!(TmpNode (Clone) {
    data: String,
    r#type: String,
  });

  impl TmpNode {
    pub fn new(data: &str, typ: &str) -> Self {
      Self {
        data: data.to_string(),
        r#type: typ.to_string(),
      }
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
  pub async fn status() -> impl ApiRes {
    HttpRes::Ok()
  }

  #[post("/add-url")]
  pub async fn add_url(app: AppState, data: Json<Url>) -> HttpRes {
    let tmp_url = TmpNode::new(&data.url, "url");

    emit_node(app, "add-url", tmp_url)
  }

  #[post("/add-nickname")]
  pub async fn add_nickname(app: AppState, data: Json<Nickname>) -> HttpRes {
    let tmp_nickname = TmpNode::new(&data.nickname, "nickname");

    emit_node(app, "add-nickname", tmp_nickname)
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
