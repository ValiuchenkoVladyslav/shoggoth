type TauriCmd =
  | "browse"
  | "sherlock_install"
  | "sherlock_check"
  | "sherlock_search"
  | "infoga_install"
  | "infoga_check"
  | "infoga_scan"
  | "infoga_urls"
  | "get_projects"
  | "get_graph"
  | "create_project"
  | "edit_meta"
  | "edit_graph"
  | "delete_project";

declare module "@tauri-apps/api/core" {
  function invoke<T>(cmd: TauriCmd, args?: Record<string, unknown>): Promise<T>;
}
