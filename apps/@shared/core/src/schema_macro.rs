//! helper macro for schema creation

/// lets you create a struct with set of useful features
/// - [serde::Serialize], [serde::Deserialize], [Debug], [Default]
/// - [ts_rs::TS] `ts(export, export_to = "./index.ts")`
///
/// #### Usage
/// ```rust
/// use shogg_core::schema;
///
/// schema!(SchemaName {
///   field1: String,
///   field?: u64, // ? wraps field type with Option and prepends #[ts(optional)]
/// });
///
/// // additional derives can be passed as a tuple after schema name
/// schema!(AdditionalDerives (Clone, PartialEq, Eq) {
///   field1: String,
/// });
/// ```
#[macro_export]
macro_rules! schema {
  // exit
  ($name:ident $(($($derives:ident),*))? {} -> ($($result:tt)*)) => (
    #[derive(ts_rs::TS, serde::Serialize, serde::Deserialize, Debug, Default $(, $($derives),*)?)]
    #[ts(export, export_to = "./index.ts")]
    pub struct $name {
      $($result)*
    }
  );

  ( // optinal field
    $name:ident $(($($derives:ident),*))? {
      $(#[$attributes:meta])*
      $field:ident?: $typ:ty,
      $($rest:tt)*
    } -> ($($result:tt)*)
  ) => (
    schema!($name $(($($derives),*))? { $($rest)* } -> (
      $($result)*
      $(#[$attributes])*
      #[ts(optional)]
      pub $field: Option<$typ>,
    ));
  );

  ( // required field
    $name:ident $(($($derives:ident),*))? {
      $(#[$attributes:meta])*
      $field:ident: $typ:ty,
      $($rest:tt)*
    } -> ($($result:tt)*)
  ) => (
    schema!($name $(($($derives),*))? { $($rest)* } -> (
      $($result)*
      $(#[$attributes])*
      pub $field: $typ,
    ));
  );

  ( // enter
    $name:ident $(($($derives:ident),*))? {
      $($fields:tt)*
    }
  ) => (
    schema!($name $(($($derives),*))? {
      $($fields)*
    } -> ());
  );
}
