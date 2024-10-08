import type { QueryClient, Updater } from "@tanstack/react-query";
import type { ProjectMeta } from "~/gen/core";

export const projectsQueryKey = ["projects"] as const;

export function setProjects(
  queryClient: QueryClient,
  updater: Updater<ProjectMeta[] | undefined, ProjectMeta[] | undefined>,
) {
  return queryClient.setQueryData(projectsQueryKey, updater);
}

export function projectGraphQueryKey(id: ProjectMeta["id"]) {
  return ["get_graph", id] as const;
}
