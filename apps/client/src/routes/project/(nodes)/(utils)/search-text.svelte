<script lang="ts">
  import { browse } from "$lib/utils";
  import { Search } from "lucide-svelte";

  let { text }: { text?: string; } = $props();

  const searchUrls = [
    "https://www.google.com/search?q=",
    "https://duckduckgo.com/?q=",
    "https://yandex.com/search/?text=",
  ];
</script>

<button
  disabled={!text}
  onclick={() => searchUrls.forEach((u) => browse(u + encodeURIComponent(text!)))}
  class="disabled:opacity-75"
>
  <Search />
  Search Text
</button>

<button
  disabled={!text}
  onclick={() => searchUrls.forEach((u) => browse(u + encodeURIComponent(text!)))}
  class="disabled:opacity-75"
>
  <Search />
  Search Exact Text
</button>
