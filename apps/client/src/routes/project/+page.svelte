<script lang="ts">
  import { Background, BackgroundVariant, Controls, SvelteFlow, type Node } from "@xyflow/svelte";
  import { nodeTypes } from "./(nodes)";
  import GraphCtx from "./graph-ctx.svelte";
  import { nodes, edges } from "./store";

  let unfinishedConn: any | null = null;
  let nodesCache: Node[] = [];

  $effect(() => { // on nodes change
    if (unfinishedConn && $nodes.length > nodesCache.length) {
      const missingObj = $nodes.filter(obj => !nodesCache.some(o => o.id === obj.id))[0];

      edges.update((old) => [...old, {
        id: `${unfinishedConn.fromNode.id}-${missingObj.id}`,
        source: unfinishedConn.fromNode.id,
        target: missingObj.id,
      }]);

      unfinishedConn = null;
    }

    if ($nodes.length !== nodesCache.length) nodesCache = $nodes;
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
      if (evt.dataTransfer) evt.dataTransfer.dropEffect = "move";
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
