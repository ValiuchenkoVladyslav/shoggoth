<script module lang="ts">
  import { AtSign } from "lucide-svelte";
  import type { Nickname } from "~/gen/core";

  export function nicknameInit(nickname = ""): Nickname {
    return { nickname };
  }

  export { AtSign as NicknameIcon };
</script>

<script lang="ts">
  import BaseNode from "./base-node.svelte";

  let { id, data }: TypedNode<Nickname> = $props();
</script>

<BaseNode {id}>
  {#snippet opts()}
    <button>
      Sherlock
    </button>
  {/snippet}

  <div class="w-64 dark rounded-lg py-2 px-3 flexcol gap-2">
    <h2 class="flex gap-2 items-center">
      <AtSign />
      NICKNAME
    </h2>

    <input
      bind:value={data.nickname}
      class="dark nowheel nodrag border border-2 border-gray-800 rounded-md py-1 px-2"
    />
  </div>
</BaseNode>
