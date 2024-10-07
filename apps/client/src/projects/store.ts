import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { create } from "zustand";
import type { ProjectMeta } from "~/gen/ProjectMeta";
import type { InferParams } from "~/utils";

export type OpenProject = null | ProjectMeta;

export const useProject = create((...args: unknown[]) => {
  const [set] = args as InferParams<typeof useProject>;

  return {
    project: null as OpenProject,

    openProject(project: OpenProject, router: AppRouterInstance) {
      if (project) {
        router.push("/project");
      } else if (location.pathname === "/project") {
        router.push("/");
      }

      set({ project });
    },
  };
});
