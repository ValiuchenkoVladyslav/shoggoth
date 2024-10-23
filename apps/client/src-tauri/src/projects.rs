//! project commands

use shogg_core::projects::{
  self,
  schemas::{DataGraph, ProjectBase, ProjectMeta},
};

use crate::utils::*;

#[command(rename_all = "snake_case")]
pub fn get_projects(app: App) -> CmdRes<Vec<ProjectMeta>> {
  Ok(projects::read_projects(app.projects_dir())?)
}

#[command(rename_all = "snake_case")]
pub fn edit_meta(app: App, meta: ProjectMeta) -> CmdRes {
  Ok(projects::write_meta(app.projects_dir(), meta)?)
}

#[command(rename_all = "snake_case")]
pub fn edit_graph(app: App, id: &str, graph: DataGraph) -> CmdRes {
  Ok(projects::write_graph(app.projects_dir(), id, graph)?)
}

#[command(rename_all = "snake_case")]
pub fn get_graph(app: App, id: &str) -> CmdRes<DataGraph> {
  Ok(projects::read_graph(app.projects_dir(), id)?)
}

#[command(rename_all = "snake_case")]
pub fn create_project(app: App, project_base: ProjectBase) -> CmdRes<ProjectMeta> {
  Ok(projects::create_project(app.projects_dir(), project_base)?)
}

#[command(rename_all = "snake_case")]
pub fn delete_project(app: App, id: &str) -> CmdRes {
  Ok(projects::delete_project(app.projects_dir(), id)?)
}
