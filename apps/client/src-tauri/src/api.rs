//! api to allow interaction with browser extension

use crate::{extension, utils::*};
use actix_web::{get, web, App as ActixApp, HttpResponse, HttpServer, Responder};

#[get("/")]
async fn status() -> impl Responder {
  HttpResponse::Ok()
}

pub fn run_server(app: &App) -> Result<(), AnyErr> {
  let server_data = web::Data::new(app.clone());

  let server = HttpServer::new(move || {
    ActixApp::new()
      .app_data(server_data.clone())
      .service(status)
      .service(extension::extension_scope())
  })
  .bind("127.0.0.1:2099")
  .ctx("Failed to bind a server")?
  .disable_signals()
  .run();

  tauri::async_runtime::spawn(server);

  Ok(())
}
