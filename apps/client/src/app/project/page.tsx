"use client";

import { errorToast } from "~/components/toasts";
import { useProject } from "~/store";
import { useProjectGraphQuery } from "~/tauri-api/projects";
import { Graph } from "./_graph";
import { GraphContextMenu } from "./_graph-context-menu";

export default function ProjectPage() {
  const projId = useProject((state) => state.project?.id as string);
  const projectGraph = useProjectGraphQuery(projId);

  if (!projectGraph.data) {
    if (projectGraph.error) {
      errorToast("Error fetching project graph!", projectGraph.error);
    }

    return null;
  }

  return (
    <GraphContextMenu>
      <Graph {...projectGraph.data} />
    </GraphContextMenu>
  );
}
