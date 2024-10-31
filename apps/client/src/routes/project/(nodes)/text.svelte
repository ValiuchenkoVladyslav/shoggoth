<script module lang="ts">
  import type { Text } from "~/gen/core";
  import { Text as TextIcon, Search } from "lucide-svelte";

  export function textInit(text = ""): Text {
    return { text };
  }

  export { TextIcon };
</script>

<script lang="ts">
  import { Textarea } from "$lib/components";
  import BaseNode from "./base-node.svelte";
  import { browse } from "$lib/utils";

  let { id, data }: TypedNode<Text> = $props();

  const googleSearch = "https://www.google.com/search?q=";
  const ddgSearch = "https://duckduckgo.com/?q=";
  const yandexSearch = "https://yandex.com/search/?text=";

  const searchUrl = (pref: string) => pref + encodeURIComponent(data.text ?? "");
  const searchExactUrl = (pref: string) => pref + encodeURIComponent(`"${data.text}"`);
</script>

<BaseNode {id}>
  {#snippet opts()}
    <button onclick={() => {
      browse(searchUrl(googleSearch));
      browse(searchUrl(ddgSearch));
      browse(searchUrl(yandexSearch));
    }}>
      <Search />
      search text
    </button>
    <button onclick={() => {
      browse(searchExactUrl(googleSearch));
      browse(searchExactUrl(ddgSearch));
      browse(searchExactUrl(yandexSearch));
    }}>
      <Search />
      search exact text
    </button>
  {/snippet}

  <div class="w-64 dark rounded-lg py-2 px-3 flexcol gap-2">
    <h2 class="flex gap-2 items-center">
      <TextIcon size={22} />
      TEXT
    </h2>

    <Textarea bind:value={data.text} />
  </div>
</BaseNode>
