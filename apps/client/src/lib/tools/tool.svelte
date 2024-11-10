<script lang="ts">
  import type { Snippet } from "svelte";
  import {
    CheckCheck,
    ChevronDown,
    Download,
    ExternalLinkIcon,
    LoaderCircle,
  } from "lucide-svelte";
  import { browse } from "$lib/utils";
  import { Btn } from "$lib/components";
  import type { CreateMutationResult, CreateQueryResult } from "@tanstack/svelte-query";

  type Props = {
    name: string;
    url: string;
    checkQuery: () => CreateQueryResult<boolean, Error>;
    installMut: () => CreateMutationResult<unknown, Error, void, unknown>;
    children: Snippet;
  }

  let { name, url, checkQuery, installMut, children }: Props = $props();

  let open = $state(false);

  let installedQuery = checkQuery();
  let install = installMut();
</script>

<details
  bind:open
  class="rounded-lg overflow-hidden dark px-4"
>
  <summary class="select-none cursor-pointer flex items-center justify-between py-3">
    <div class="flex gap-2 items-center">
      <ChevronDown strokeWidth={3} class={open ? "" : "rotate-[-90deg]"} />

      <h1>{name}</h1>

      <button onclick={() => browse(url)} class="opacity-75 hover:opacity-100">
        <ExternalLinkIcon />
      </button>
    </div>

    <Btn
      class="light"
      disabled={!!$installedQuery.data}
      onclick={() => $install.mutate()}
    >
      {#if $install.isPending}
        <LoaderCircle class="animate-spin" />
        Downloading
      {:else if !!$installedQuery.data}
        <CheckCheck />
        Installed
      {:else}
        <Download />
        Download
      {/if}
    </Btn>
  </summary>

  <article class="pb-4">
    {@render children()}
  </article>
</details>
