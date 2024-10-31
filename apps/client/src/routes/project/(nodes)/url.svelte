<script module lang="ts">
  import { Link } from "lucide-svelte";
  import type { Url } from "~/gen/core";

  export function urlInit(url = ""): Url {
    return { url };
  }

  export { Link as URLIcon };
</script>

<script lang="ts">
  import BaseNode from "./base-node.svelte";

  let { id, data }: TypedNode<Url> = $props();
</script>

<BaseNode {id}>
  {#snippet opts()}
    <button>
      WEBARCHIVE
    </button>
  {/snippet}

  <div class="w-64 dark rounded-lg py-2 px-3 flexcol gap-2">
    <h2 class="flex gap-2 items-center">
      <Link />
      URL
    </h2>

    <input
      bind:value={data.url}
      class="dark nowheel nodrag border border-2 border-gray-800 rounded-md py-1 px-2"
    />
  </div>
</BaseNode>
