<script lang="ts">
  import { Select } from "$lib/components";
  import CreateProject from "./create-project.svelte";
  import { Search } from "lucide-svelte";
  import ProjectCard from "./project-card.svelte";
  import { getProjects } from "$lib/projects/tauri-api";

  let prjFilter = $state<string>();
  let prjSearch = $state<string>();

  let projects = getProjects();
</script>

<menu class="sticky left-0 top-0 dark p-3 rounded-lg flex gap-3 z-[5] border border-2">
  <CreateProject />

  <search class="flex-1 light flex rounded-lg overflow-hidden gap-3 items-center px-3">
    <Search />
    <input
      class="flex-1 focus:outline-0 text-lg"
      placeholder="Search projects"
      bind:value={prjSearch}
    />
  </search>

  <Select initText="Filter projects" bind:value={prjFilter}>
    <option value="all">All</option>
    <option value="archived">Archived</option>
    <option value="active">Active</option>
  </Select>
</menu>

<section class="grid gap-3 pt-3 grid-cols-2 xl:grid-cols-3">
  {#if $projects.isSuccess}
    {#each $projects.data.filter((prj) => {
      if (prjFilter === "archived") return prj.archived;
      if (prjFilter === "active") return !prj.archived;

      return true; // ProjectFilter.All
    }).sort((a, b) => {
      if (a.archived !== b.archived) return a.archived ? 1 : -1;
      return Number(b.created_at - a.created_at);
    }) as prj}
      <ProjectCard {...prj} /> 
    {/each}
  {:else if $projects.isError}
    <p class="text-red-500 font-semibold">
      {$projects.error.message}
    </p>
  {/if}
</section>
