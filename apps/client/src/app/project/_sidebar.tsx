"use client";

import { useReactFlow } from "@xyflow/react";
import { errorToast } from "~/components/toasts";
import { Button } from "~/components/ui/button";
import type { DataNode } from "~/gen/DataNode";
import { useProject } from "~/store";
import { useEditProjectGraphMutation } from "~/tauri-api/projects";

export function Sidebar() {
  const project = useProject((state) => state.project);
  const { getNodes, getEdges } = useReactFlow();
  const editProjectGraph = useEditProjectGraphMutation();

  if (editProjectGraph.isError) {
    errorToast("Error saving project graph!", editProjectGraph.error);
  }

  return (
    <aside>
      <p className="opacity-70">{project?.desc}</p>
      <Button
        onClick={() => {
          editProjectGraph.mutate({
            id: project!.id,
            graph: {
              nodes: getNodes() as DataNode[],
              edges: getEdges(),
            },
          });
        }}
      >
        Save Project
      </Button>
    </aside>
  );
}
