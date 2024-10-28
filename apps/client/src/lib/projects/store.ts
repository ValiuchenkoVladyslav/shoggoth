import { goto } from "$app/navigation";
import { writable } from "svelte/store";
import type { ProjectMeta } from "~/gen/core";

export const openProject = writable<ProjectMeta | null>(null);

export function changeOpenProject(meta: ProjectMeta | null) {
  if (meta) {
    goto("/project");
  } else if (location.pathname === "/project") {
    goto("/");
  }

  openProject.set(meta);
}
