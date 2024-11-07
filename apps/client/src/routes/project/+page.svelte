<script lang="ts">
  import { Background, BackgroundVariant, Controls, SvelteFlow, type Node, useSvelteFlow } from "@xyflow/svelte";
  import { nodeTypes } from "./(nodes)";
  import GraphCtx from "./graph-ctx.svelte";
  import { nodes, edges, tmpNodes } from "./store";
  import type { TmpNode } from "~/gen/tauri";
  import { get } from "svelte/store";
  import type { Node as DataNode } from "~/gen/core";
  import { editProjectGraph } from "$lib/projects/tauri-api";
  import { openProject } from "$lib/projects/store";

  const { screenToFlowPosition } = useSvelteFlow();

  let nodesCache: Node[] = [];

  // AUTOSAVE
  let autosaveTimeout: NodeJS.Timeout | undefined;
  const editGraph = editProjectGraph();

  $effect(() => {
    clearTimeout(autosaveTimeout);
    const _nodes = $nodes;
    const _edges = $edges;

    autosaveTimeout = setTimeout(() => {
      get(editGraph).mutate({
        id: get(openProject)!.id,
        graph: {
          nodes: _nodes as DataNode[],
          edges: _edges,
        }
      });
    }, 850);
  });

  // CREATE NEW NODE IF CONNECTION ENDS ON BLANK SPACE
  let unfinishedConn: any; // FinalConnectionState not exported

  $effect(() => { // on nodes change
    if ($nodes.length === nodesCache.length) return;

    if (unfinishedConn && $nodes.length > nodesCache.length) {
      const missingObj = $nodes.filter(obj => !nodesCache.some(o => o.id === obj.id))[0];

      edges.update((old) => [...old, {
        id: `${unfinishedConn.fromNode.id}-${missingObj.id}`,
        source: unfinishedConn.fromNode.id,
        target: missingObj.id,
      }]);

      unfinishedConn = null;
    }

    nodesCache = $nodes;
  });

  let ctxOpen = $state<{ x: number; y: number; }>();
</script>

<GraphCtx open={ctxOpen}>
  <SvelteFlow
    {nodes}
    {edges}
    {nodeTypes}
    fitView
    proOptions={{ hideAttribution: true }}
    deleteKey="Delete"

    ondragover={(evt) => {
      evt.preventDefault();
      evt.dataTransfer!.dropEffect = "move";
    }}
    ondrop={(evt) => {
      try {
        const tmpNode: TmpNode = JSON.parse(evt.dataTransfer!.getData("text/plain"));

        tmpNodes.update((old) => old.filter((n) => n.id !== tmpNode.id));

        nodes.update((old) => [...old, {
          id: String(tmpNode.id),
          position: screenToFlowPosition({ x: evt.clientX, y: evt.clientY }),
          type: tmpNode.type,
          data: JSON.parse(tmpNode.data),
        }]);
      } catch (e) {
        console.error("Failed to create node!", e);
      }
    }}

    onconnectend={(evt, conn) => {
      if (conn.isValid) return;

      unfinishedConn = conn;

      setTimeout(() => ctxOpen = { // click event is fired so we need to set after that event
        x: (evt as MouseEvent).clientX,
        y: (evt as MouseEvent).clientY,
      });
    }}
  >
    <Controls
      class="*:!text-white *:!bg-black rounded-md overflow-hidden border-2 border-white"
      position="top-left"
    />
    <Background variant={BackgroundVariant.Dots} />
  </SvelteFlow>    
</GraphCtx>
