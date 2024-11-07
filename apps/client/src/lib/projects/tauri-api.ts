import {
  type QueryClient,
  type Updater,
  createMutation,
  createQuery,
  useQueryClient,
} from "@tanstack/svelte-query";
import { invoke } from "@tauri-apps/api/core";
import type { DataGraph, ProjectBase, ProjectMeta } from "~/gen/core";

const projectsQueryKey = ["projects"] as const;

function setPrjs(
  client: QueryClient,
  updater: Updater<ProjectMeta[] | undefined, ProjectMeta[] | undefined>,
) {
  client.setQueryData(projectsQueryKey, updater);
}

function prjGraphQueryKey(id: ProjectMeta["id"]) {
  return ["get_graph", id] as const;
}

// FNS ========================================================================
export function getProjects() {
  return createQuery({
    queryKey: projectsQueryKey,
    queryFn: () => invoke<ProjectMeta[]>("get_projects"),
  });
}

export function getProjectGraph(projectId: ProjectMeta["id"]) {
  return createQuery({
    queryKey: prjGraphQueryKey(projectId),
    queryFn: () => invoke<DataGraph>("get_graph", { id: projectId }),
  });
}

export function createProject() {
  const client = useQueryClient();

  return createMutation({
    mutationFn(project_base: ProjectBase) {
      return invoke<ProjectMeta>("create_project", { project_base });
    },
    onSuccess(res) {
      setPrjs(client, (old) => [...(old ?? []), res]);
    },
  });
}

export function editProject() {
  const client = useQueryClient();

  return createMutation({
    mutationFn(meta: ProjectMeta) {
      return invoke("edit_meta", { meta });
    },
    onSuccess(_, vars) {
      setPrjs(client, (old) =>
        old?.map((p) => (p.id === vars.id ? { ...vars } : p)),
      );
    },
  });
}

export function editProjectGraph() {
  const client = useQueryClient();

  return createMutation({
    mutationFn(vars: { id: string; graph: DataGraph }) {
      return invoke("edit_graph", vars);
    },
    onSuccess(_, vars) {
      client.setQueryData(prjGraphQueryKey(vars.id), vars.graph);
    },
  });
}

export function deleteProject() {
  const client = useQueryClient();

  return createMutation({
    mutationFn(id: string) {
      return invoke("delete_project", { id });
    },
    onSuccess(_, id) {
      setPrjs(client, (old) => old?.filter((p) => p.id !== id));
    },
  });
}
