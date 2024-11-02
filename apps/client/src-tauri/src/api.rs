//! api to allow interaction with external tools

pub mod utils {
  use serde::Serialize;
  use serde_json::{to_string, Result};
  use shogg_core::schema;

  pub type HttpRes = actix_web::HttpResponse;

  schema!(TmpNode (Clone) {
    id: u64,
    data: String,
    r#type: String,
  });

  impl TmpNode {
    pub fn new<T: ?Sized + Serialize>(data: &T, typ: &str) -> Result<Self> {
      Ok(Self {
        id: Box::into_raw(Box::new(0)) as u64,
        data: to_string(data)?,
        r#type: typ.into(),
      })
    }
  }

  /// define route for adding a temporary node
  macro_rules! add_node {
    ($path:literal, $evt:literal, $node_type:literal, $typ:ty, $node_name:ident) => {
      #[actix_web::post($path)]
      pub async fn $node_name(
        app: crate::utils::AppState,
        data: Json<$typ>,
      ) -> actix_web::HttpResponse {
        use tauri::Emitter;

        let Ok(tmp_node) = TmpNode::new(&data, $node_type) else {
          return HttpRes::BadRequest().body(concat!("Failed to serialize the ", $node_type));
        };

        if app.emit($evt, tmp_node).is_ok() {
          return HttpRes::Ok().finish();
        }

        HttpRes::InternalServerError().body("Failed to emit temporary node")
      }
    };
  }

  pub(crate) use add_node;
}

mod routes {
  use super::utils::*;
  use actix_web::{get, web::Json};
  use shogg_core::projects::schemas::node_types::{Nickname, Text, Url};

  #[get("/")]
  pub async fn status() -> HttpRes {
    HttpRes::Ok().finish()
  }

  add_node!("/add-url", "add-url", "url", Url, add_url);

  add_node!(
    "/add-nickname",
    "add-nickname",
    "nickname",
    Nickname,
    add_nickname
  );

  add_node!("/add-text", "add-text", "text", Text, add_text);
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
      .service(add_text)
  })
  .bind("127.0.0.1:2099")
  .ctx("Failed to bind a server")?
  .disable_signals()
  .run();

  tauri::async_runtime::spawn(server);

  Ok(())
}
