<script module lang="ts">
  import type { Text } from "~/gen/core";
  import { Text as Icon } from "lucide-svelte";

  export function textInit(text = ""): Text {
    return { text };
  }

  export { Icon };
</script>

<script lang="ts">
  import { Textarea } from "$lib/components";
  import BaseNode from "./base-node.svelte";
  import type { TypedNode } from "./utils";

  let { id, data }: TypedNode<Text> = $props();
</script>

<BaseNode {id}>
  {#snippet opts()}
    <button onclick={() => console.log("text opt")}>
      text option
    </button>
  {/snippet}

  <div class="w-64 dark rounded-lg py-2 px-3 flexcol">
    <h2 class="flex gap-2 items-center">
      <Icon size={22} />
      TEXT
    </h2>

    <Textarea value={data.text} />
  </div>
</BaseNode>
