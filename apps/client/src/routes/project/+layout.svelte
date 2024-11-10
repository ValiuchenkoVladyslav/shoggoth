<script lang="ts">
  import "@xyflow/svelte/dist/style.css";
  import "flag-icons/css/flag-icons.min.css";

  import { Layout } from "$lib/components";
  import { nodes, edges, tmpNodes } from "./store";
  import { getProjectGraph } from "$lib/projects/tauri-api";
  import { openProject } from "$lib/projects/store";
  import { SvelteFlowProvider } from "@xyflow/svelte";
  import { listen } from "@tauri-apps/api/event";
  import type { TmpNode } from "~/gen/tauri";
  import CatOtpRequest from "$lib/tools/bellingcat-tg/otp-request.svelte";

  const graph = getProjectGraph($openProject?.id ?? "INVALID_ID");

  $effect(() => {
    nodes.set($graph.data?.nodes ?? []);
    edges.set($graph.data?.edges ?? []);
  });

  function handleNode(evt: { payload: TmpNode }) {
    tmpNodes.update((old) => [...old, evt.payload]);
  }

  $effect(() => {
    const listeners = ["url", "nickname", "text"]
      .map((type) => listen(`add-${type}`, handleNode));

    return () => Promise.all(listeners).then(unsubs => unsubs.forEach(u => u()));
  });

  let { children } = $props();
</script>

<CatOtpRequest />

<SvelteFlowProvider>
  <Layout sidebarClasses="justify-between">
    {#snippet sidebar()}
      <section>
        <h2 class="font-bold text-lg">Incoming Nodes</h2>

        <ul class="flexcol gap-2">
          {#each $tmpNodes as node}
            <li
              draggable="true"
              class="py-2 px-3 rounded-lg bg-gray-900 cursor-grab"
              ondragstart={(evt) => {
                evt.dataTransfer!.effectAllowed = "move";
                evt.dataTransfer!.setData("text/plain", JSON.stringify(node));
              }}
            >
              <h3 class="text-lg font-semibold uppercase">{node.type}</h3>

              {#each Object.entries(JSON.parse(node.data)) as [key, value]}
                <p class="break-words">
                  {key}: {String(value)}
                </p>
              {/each}
            </li>
          {/each}
        </ul>
      </section>
    {/snippet}

    {#if $graph.isSuccess}
      {@render children()}
    {:else if $graph.isError}
      <p class="p-3 text-red-600 font-bold">
        {$graph.error}
      </p>
    {/if}
  </Layout>  
</SvelteFlowProvider>
