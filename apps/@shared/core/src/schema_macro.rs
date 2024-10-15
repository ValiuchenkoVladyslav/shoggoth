/// helper macro to create a struct with following attributes:
/// - derive `TS`, `Serialize`, `Deserialize`, `Debug`
/// - ts-rs `ts(export, export_to = "./index.ts")`
/// you can also add custom derives by passing them as a tuple after schema name
/// ### Usage
/// ```rust
/// shogg_core::schema!(SchemaName {
///   field1: String,
/// });
///
/// shogg_core::schema!(WithAdditionalDerives (Default) {
///   field1: String,
/// });
/// ```
#[macro_export]
macro_rules! schema {
  (
    $name:ident $(($($derives:ident),*))? {
      $(
        $(#[$field_attr:meta])*
        $field:ident: $typ:ty$(,)?
      ),*
    }
  ) => {
    #[derive(ts_rs::TS, serde::Serialize, serde::Deserialize, Debug $(, $($derives),*)?)]
    #[ts(export, export_to = "./index.ts")]
    pub struct $name {
      $(
        $(#[$field_attr])*
        pub $field: $typ
      ),*
    }
  };
}
