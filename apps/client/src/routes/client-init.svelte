<script lang="ts">
  import { dev } from "$app/environment";
  import PrefetchTools from "$lib/tools/prefetch.svelte";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import type { Snippet } from "svelte";

  let { children }: { children: Snippet } = $props();
</script>

<!-- disable some browser features in prod so app feels more native -->
<svelte:window
  oncontextmenu={(evt) => evt.preventDefault()}
  onkeydown={(e) => {
    if (dev) return;

    if (["r", "f"].includes(e.key.toLowerCase()) && (e.ctrlKey || e.metaKey))
      e.preventDefault();

    if (e.key === "F5") e.preventDefault();
  }}
/>

<QueryClientProvider client={new QueryClient()}>
  <PrefetchTools />

  {@render children()}
</QueryClientProvider>
