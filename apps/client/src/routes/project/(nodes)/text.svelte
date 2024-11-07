<script module lang="ts">
  import type { Text } from "~/gen/core";
  import { Text as TextIcon } from "lucide-svelte";

  export function textInit(text = ""): Text {
    return { text };
  }

  export { TextIcon };
</script>

<script lang="ts">
  import { Textarea } from "$lib/components";
  import { nodes } from "../store";
  import { BaseNode, SearchText } from "./(utils)";

  let { id, data }: TypedNode<Text> = $props();

  let text = $state(data.text);

  $effect(() => {
    nodes.update((old) => old.map((n) => n.id !== id ? n : {
      ...n,
      data: { ...n.data, text },
    }));
  });
</script>

<BaseNode {id}>
  {#snippet opts()}
    <SearchText {text} />
  {/snippet}

  <div class="w-64 dark rounded-lg py-2 px-3 flexcol gap-2">
    <h2 class="flex gap-2 items-center">
      <TextIcon size={22} />
      TEXT
    </h2>

    <Textarea bind:value={text} />
  </div>
</BaseNode>
