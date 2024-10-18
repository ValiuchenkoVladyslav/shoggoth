declare module "@tauri-apps/api/core" {
  type TauriCmd =
    | "browse"
    | "cattg_install"
    | "cattg_check"
    | "cattg_phone"
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

  function invoke<T>(cmd: TauriCmd, args?: Record<string, unknown>): Promise<T>;
}
