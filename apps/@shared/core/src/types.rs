use serde::{Deserialize, Serialize};
use serde_json::{Map, Value};
use ts_rs::TS;

#[derive(TS, Serialize, Deserialize)]
#[ts(export)]
pub struct ProjectBase {
  pub name: String,
  pub desc: String,
  pub team_url: Option<String>,
}

#[derive(TS, Serialize, Deserialize)]
#[ts(export)]
pub struct ProjectMeta {
  pub id: String,
  pub created_at: u128,
  pub archived: bool,

  #[serde(flatten)]
  pub base: ProjectBase,
}

#[derive(TS, Serialize, Deserialize)]
#[ts(export)]
pub struct DataNodeEdge {
  pub id: String,
  pub source: String,
  pub target: String,
}

#[derive(TS, Serialize, Deserialize)]
#[ts(export)]
pub struct NodePos {
  pub x: f32,
  pub y: f32,
}

#[derive(TS, Serialize, Deserialize)]
#[ts(export)]
pub struct DataNode {
  pub id: String,
  pub position: NodePos,
  pub r#type: Option<String>,
  pub data: Map<String, Value>,
}

#[derive(TS, Serialize, Deserialize, Default)]
#[ts(export)]
pub struct DataGraph {
  pub nodes: Vec<DataNode>,
  pub edges: Vec<DataNodeEdge>,
}

#[derive(TS, Serialize, Deserialize)]
#[ts(export)]
pub struct ProjectFull {
  pub meta: ProjectMeta,
  pub graph: DataGraph,
}
