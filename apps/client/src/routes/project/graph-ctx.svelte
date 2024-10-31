<script lang="ts">
  import { CtxMenu } from "$lib/components";
  import { useSvelteFlow } from "@xyflow/svelte";
  import type { Snippet } from "svelte";
  import { nodes } from "./store";
  import { newId } from "$lib/utils";

  import { textInit, TextIcon } from "./(nodes)/text.svelte";  
  import { URLIcon, urlInit } from "./(nodes)/url.svelte";
  import { NicknameIcon, nicknameInit } from "./(nodes)/nickname.svelte";

  type Props = {
    children: Snippet;
    open?: { x: number; y: number; };
  }

  let { children, open }: Props = $props();

  const { screenToFlowPosition } = useSvelteFlow();

  function addNode(type: string, data: () => Record<string, unknown>, evt: MouseEvent) {
    nodes.update((old) => [...old, {
      id: newId(),
      position: screenToFlowPosition({ x: evt.clientX, y: evt.clientY }),
      type,
      data: data(),
    }]);
  }
</script>

<CtxMenu bind:open={open}>
  {#snippet options()}
    <button onclick={e => addNode("text", textInit, e)}>
      <TextIcon />
      Add Text
    </button>
    <button onclick={e => addNode("url", urlInit, e)}>
      <URLIcon />
      Add URL
    </button>
    <button onclick={e => addNode("nickname", nicknameInit, e)}>
      <NicknameIcon />
      Add Nickname
    </button>
  {/snippet}

  <div class="h-[calc(100vh-32px)]">
    {@render children()}
  </div>
</CtxMenu>
