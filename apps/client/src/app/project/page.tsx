"use client";

import { errorToast } from "~/components/toasts";
import { useProject } from "~/projects/store";
import { useProjectGraphQuery } from "~/projects/tauri-api";
import { Graph } from "./_graph";

export default function ProjectPage() {
  const projectGraph = useProjectGraphQuery(useProject((s) => s.project?.id!));

  if (!projectGraph.data) {
    if (projectGraph.error) {
      errorToast("Error fetching project graph!", projectGraph.error);
    }

    return null;
  }

  return <Graph {...projectGraph.data} />;
}
