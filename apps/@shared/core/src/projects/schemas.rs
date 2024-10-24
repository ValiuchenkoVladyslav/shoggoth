//! useful schemas

use crate::schema;
use serde_json::{Map, Value};

pub mod node_types {
  use crate::schema;

  schema!(Text {
    text?: String,
  });

  schema!(Country {
    name: String,
  });

  schema!(Url {
    url: String,
  });

  schema!(TelegramUser {
    id?: u64,
    username?: String,
    usernames?: Vec<String>,
    first_name?: String,
    last_name?: String,
    fake?: bool,
    verified?: bool,
    premium?: bool,
    bot?: bool,
    restricted?: bool,
    restricted_reason?: String,
    user_was_online?: String,
    phone?: String,
  });

  schema!(Nickname {
    nickname: String,
  });

  schema!(Phone {
    number: String,
    carrier?: String,
    location?: String,
  });

  #[derive(Debug, Default, serde::Serialize, serde::Deserialize, ts_rs::TS)]
  #[ts(export, export_to = "./index.ts", untagged)]
  pub enum NodeType {
    Text(Text),
    Country(Country),
    TelegramUser(TelegramUser),
    Nickname(Nickname),
    Phone(Phone),

    #[default]
    None,
  }
}

schema!(ProjectBase {
  name: String,
  desc: String,
  team_url?: String,
});

schema!(ProjectMeta {
  id: String,
  created_at: u128,
  archived: bool,

  #[serde(flatten)]
  base: ProjectBase,
});

schema!(Edge {
  id: String,
  source: String,
  target: String,
});

schema!(NodePos {
  x: f32,
  y: f32,
});

schema!(Node {
  id: String,
  position: NodePos,
  r#type: String,
  data: Map<String, Value>,
});

schema!(DataGraph {
  nodes: Vec<Node>,
  edges: Vec<Edge>,
});

schema!(ProjectFull {
  meta: ProjectMeta,
  graph: DataGraph,
});
