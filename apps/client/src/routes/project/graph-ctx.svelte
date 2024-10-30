<script lang="ts">
  import { CtxMenu } from "$lib/components";
  import { textInit } from "./(nodes)/text.svelte";
  import { type Node, useSvelteFlow } from "@xyflow/svelte";
  import type { Snippet } from "svelte";
  import { nodes } from "./store";
  import { newId } from "$lib/utils";

  type Props = {
    children: Snippet;
    open?: { x: number; y: number; };
  }

  let { children, open }: Props = $props();

  const { screenToFlowPosition } = useSvelteFlow();

  function addNode(data: Omit<Node, "id" | "position">, evt: MouseEvent) {
    nodes.update((old) => [...old, {
      id: newId(),
      position: screenToFlowPosition({ x: evt.clientX, y: evt.clientY }),
      ...data,
    }]);
  }
</script>

<CtxMenu bind:open={open}>
  {#snippet options()}
    <button onclick={(evt) => addNode({ type: "text", data: textInit() }, evt)}>
      Add Text
    </button>
  {/snippet}

  <div class="h-[calc(100vh-32px)]">
    {@render children()}
  </div>
</CtxMenu>
