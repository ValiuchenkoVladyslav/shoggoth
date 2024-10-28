<script lang="ts">
  import { Link } from "lucide-svelte";
  import type { Url } from "~/gen/core";
  import { post } from "$lib";
</script>

<section class="flexcol gap-2">
  <button
    class="duration-300 hover:bg-white/20 w-full py-3 px-4 rounded-lg font-semibold flex justify-center gap-3"
    onclick={() => {
      browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        if (!tabs[0].url) return;

        post<Url>("add-url", { url: tabs[0].url });
      });
    }}
  >
    <Link />
    Send current URL to client
  </button>
</section>
