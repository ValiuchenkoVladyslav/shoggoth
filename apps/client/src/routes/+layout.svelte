<script lang="ts">
  import "~/styles/main.pcss";

  import { CtxMenu, NavLink } from "$lib/components";
  import { openProject, changeOpenProject } from "$lib/projects/store";
  import { getCurrentWebview } from "@tauri-apps/api/webview";
  import { Maximize, X } from "lucide-svelte";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import { dev, browser } from "$app/environment";

	let { children } = $props();

  const appWindow = browser ? getCurrentWebview() : null;
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
  <header class="w-screen dark flex items-center justify-between pl-3" data-tauri-drag-region>
    <nav class="flex gap-4 items-center">
      <NavLink
        href="/"
        aliases={["/settings", "/teams", "/tools"]}
        class="opacity-60 hover:opacity-100 aria-[current=page]:opacity-100"
      >
        <h2>shoggoth</h2>
      </NavLink>

      <CtxMenu>
        {#snippet options()}
          <button class="text-red-600" onclick={() => changeOpenProject(null)}>
            Close project
          </button>
        {/snippet}

        <NavLink href="/project" class="opacity-60 hover:opacity-100 aria-[current=page]:opacity-100">
          <h2>{$openProject?.name}</h2>
        </NavLink>
      </CtxMenu>
    </nav>

    <menu class="flex h-8 *:grid *:place-content-center *:w-10">
      <button
        aria-label="minimize"
        onclick={() => appWindow?.window.minimize()}
        class="hover:bg-[rgba(255,255,255,.10)]"
      >
        <svg fill="white" width={16} viewBox="0 0 52 52">
          <path d="M50,48.5c0,0.8-0.7,1.5-1.5,1.5h-45C2.7,50,2,49.3,2,48.5v-3C2,44.7,2.7,44,3.5,44h45 c0.8,0,1.5,0.7,1.5,1.5V48.5z" />
        </svg>
      </button>

      <button
        onclick={() => appWindow?.window.maximize()}
        class="hover:bg-[rgba(255,255,255,.10)]"
      >
        <Maximize size={20} />
      </button>

      <button
        onclick={() => appWindow?.window.close()}
        class="hover:bg-red-700"
      >
        <X size={24} />
      </button>
    </menu>
  </header>

  {@render children()}  
</QueryClientProvider>
