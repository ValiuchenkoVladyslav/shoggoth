import type { QueryClient, Updater } from "@tanstack/svelte-query";
import type { ProjectMeta } from "~/gen/core";

export const projectsQueryKey = ["projects"] as const;

export function setProjects(
  client: QueryClient,
  updater: Updater<ProjectMeta[] | undefined, ProjectMeta[] | undefined>,
) {
  return client.setQueryData(projectsQueryKey, updater);
}

export function prjGraphQueryKey(id: ProjectMeta["id"]) {
  return ["get_graph", id] as const;
}
