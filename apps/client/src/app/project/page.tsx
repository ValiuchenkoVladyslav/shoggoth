"use client";

import { useStore } from "~/store";
import { useProjectGraphQuery } from "~/tauri-api/projects";
import { ReactFlow } from "./_react-flow";

export default function ProjectPage() {
  const projId = useStore((state) => state.openProject?.id);

  if (!projId) return null;

  const projectGraph = useProjectGraphQuery(projId);
  if (!projectGraph.data) {
    console.error(projectGraph.error);
    return null;
  }

  return <ReactFlow {...projectGraph.data} />;
}
