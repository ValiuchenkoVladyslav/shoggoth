import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import { errorToast } from "~/components/toasts";
import type { DataGraph, ProjectBase, ProjectMeta } from "~/gen/core";
import { projectGraphQueryKey, projectsQueryKey, setProjects } from "./utils";

export function useProjectsQuery() {
  return useQuery({
    queryKey: projectsQueryKey,
    queryFn: () => invoke<ProjectMeta[]>("get_projects"),
  });
}

export function useProjectGraphQuery(projectId: ProjectMeta["id"]) {
  return useQuery({
    queryKey: projectGraphQueryKey(projectId),
    queryFn: () => invoke<DataGraph>("get_graph", { id: projectId }),
  });
}

export function useCreateProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn(project_base: ProjectBase) {
      return invoke<ProjectMeta>("create_project", { project_base });
    },
    onSuccess(res) {
      setProjects(queryClient, (old) => [...(old ?? []), res]);
    },
  });
}

export function useEditProjectMetaMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn(meta: ProjectMeta) {
      return invoke("edit_meta", { meta });
    },
    onSuccess(_, vars) {
      setProjects(queryClient, (old) =>
        old?.map((p) => (p.id === vars.id ? { ...vars } : p)),
      );
    },
  });
}

export function useEditProjectGraphMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn(vars: { id: string; graph: DataGraph }) {
      return invoke("edit_graph", vars);
    },
    onSuccess(_, vars) {
      queryClient.invalidateQueries({
        queryKey: projectGraphQueryKey(vars.id),
      });
    },
    onError(error) {
      errorToast("Failed to save graph!", error);
    },
  });
}

export function useDeleteProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn(id: string) {
      return invoke("delete_project", { id });
    },
    onSuccess(_, id) {
      setProjects(queryClient, (old) => old?.filter((p) => p.id !== id));
    },
  });
}
