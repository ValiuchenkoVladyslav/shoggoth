<script lang="ts">
  import "@xyflow/svelte/dist/style.css";

  import { Layout } from "$lib/components";
  import { nodes, edges } from "./store";
  import { getProjectGraph } from "$lib/projects/tauri-api";
  import { openProject } from "$lib/projects/store";
  import { SvelteFlowProvider } from "@xyflow/svelte";

  const graph = getProjectGraph($openProject?.id ?? "INVALID_ID");

  $effect(() => {
    nodes.set($graph.data?.nodes ?? []);
    edges.set($graph.data?.edges ?? []);
  });

  let { children } = $props();
</script>

<SvelteFlowProvider>
  <Layout sidebarClasses="justify-between">
    {#snippet sidebar()}
      <p>project sidebar</p>
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
