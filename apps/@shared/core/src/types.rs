use crate::schema;
use serde_json::{Map, Value};

schema!(ProjectBase {
  name: String,
  desc: String,
  team_url: Option<String>,
});

schema!(ProjectMeta {
  id: String,
  created_at: u128,
  archived: bool,

  #[serde(flatten)]
  base: ProjectBase,
});

schema!(DataNodeEdge {
  id: String,
  source: String,
  target: String,
});

schema!(NodePos { x: f32, y: f32 });

schema!(DataNode {
  id: String,
  position: NodePos,
  r#type: Option<String>,
  data: Map<String, Value>,
});

schema!(DataGraph (Default) {
  nodes: Vec<DataNode>,
  edges: Vec<DataNodeEdge>,
});

schema!(ProjectFull {
  meta: ProjectMeta,
  graph: DataGraph,
});
