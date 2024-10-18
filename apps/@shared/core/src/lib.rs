pub mod projects;
pub mod schema_macro;
pub mod types;

use anyhow::{Context, Result};
use std::{error::Error, fmt::Display};

/// alias for `anyhow::Context`
pub trait CtxExt<T, E, C> {
  fn ctx(self, ctx: C) -> Result<T>;
}

impl<T, E: Error + Send + Sync + 'static, C: Display + Send + Sync + 'static> CtxExt<T, E, C>
  for Result<T, E>
{
  /// alias for `anyhow::Context::with_context`
  fn ctx(self, ctx: C) -> Result<T> {
    self.with_context(|| ctx)
  }
}

impl<T, C: Display + Send + Sync + 'static> CtxExt<T, (), C> for Option<T> {
  /// alias for `anyhow::Context::with_context`
  fn ctx(self, ctx: C) -> Result<T> {
    self.ok_or_else(|| anyhow::anyhow!(ctx.to_string()))
  }
}
