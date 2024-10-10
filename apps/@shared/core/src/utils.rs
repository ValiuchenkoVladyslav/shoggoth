#[macro_export]
macro_rules! schema {
  (
    $name:ident $(($($derives:ident),*))? {
      $($(#[$field_attr:meta])* $field:ident: $typ:ty $(,)?),*
    }
  ) => {
    #[derive(ts_rs::TS, serde::Serialize, serde::Deserialize, Debug $(, $($derives),*)?)]
    #[ts(export, export_to = "./index.ts")]
    pub struct $name {
      $($(#[$field_attr])* pub $field: $typ),*
    }
  }
}
