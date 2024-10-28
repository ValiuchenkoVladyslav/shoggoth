<script lang="ts">
  import { Layout, NavLink } from "$lib/components";
  import { FileQuestion, Settings, Users, Wrench } from "lucide-svelte";

  let { children } = $props();

  const linkClasses = "hover:bg-white/10 aria-[current=page]:bg-white/10 p-2 rounded-lg flex gap-2 font-bold";
</script>

<Layout sidebarClasses="justify-between">
  {#snippet sidebar()}
    <nav class="flexcol gap-2">
      <NavLink href="/" class={linkClasses}>
        <FileQuestion size={24} />
        PROJECTS
      </NavLink>

      <NavLink href="/tools" class={linkClasses}>
        <Wrench size={24} />
        TOOLS
      </NavLink>

      <NavLink href="/teams" class={linkClasses}>
        <Users size={24} />
        TEAMS
      </NavLink>
    </nav>

    <NavLink href="/settings" class={linkClasses}>
      <Settings size={24} />
      SETTINGS
    </NavLink>
  {/snippet}

  <div class="h-full p-3 overflow-y-scroll">
    {@render children()}
  </div>
</Layout>
