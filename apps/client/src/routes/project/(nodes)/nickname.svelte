<script module lang="ts">
  import { AtSign } from "lucide-svelte";
  import type { Nickname } from "~/gen/core";
  import SherlockLogo from "~/icons/sherlock-logo.png";

  export function nicknameInit(nickname = ""): Nickname {
    return { nickname };
  }

  export { AtSign as NicknameIcon };
</script>

<script lang="ts">
  import { Sherlock } from "$lib/tools/sherlock/tauri-api";
  import { nodes } from "../store";
  import { BaseNode, SearchText } from "./(utils)";

  let { id, data }: TypedNode<Nickname> = $props();

  let sherlockSearch = Sherlock.searchNicknameMut();

  let nickname = $state(data.nickname);

  $effect(() => {
    nodes.update((old) => old.map((n) => n.id !== id ? n : {
      ...n,
      data: { ...n.data, nickname },
    }));
  });
</script>

<BaseNode {id}>
  {#snippet opts()}
    <SearchText text={nickname} />

    <button
      disabled={!nickname}
      onclick={() => $sherlockSearch.mutate(nickname)}
      class="disabled:opacity-75"
    >
      <img src={SherlockLogo} alt="Sherlock Logo" class="w-[29px]" />
      Sherlock Search
    </button>
  {/snippet}

  <div class="w-64 dark rounded-lg py-2 px-3 flexcol gap-2">
    <div class="flex gap-2 items-center">
      <AtSign />
      <input
        bind:value={nickname}
        placeholder="NICKNAME"
        class="w-full dark nowheel nodrag px-1 border border-2 border-gray-800 rounded-md"
      />
    </div>
  </div>
</BaseNode>
