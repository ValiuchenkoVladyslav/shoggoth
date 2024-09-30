import { create } from "zustand";
import type { ProjectMeta } from "~/gen/ProjectMeta";

type InferParams<T extends { setState: unknown; getState: unknown }> = [
  T["setState"],
  T["getState"],
  T,
];

type OpenProject = null | ProjectMeta;

export const useStore = create((...args: unknown[]) => {
  const [set] = args as InferParams<typeof useStore>;

  return {
    openProject: null as OpenProject,
    setOpenProject(project: OpenProject) {
      set({ openProject: project });
    },
  };
});
