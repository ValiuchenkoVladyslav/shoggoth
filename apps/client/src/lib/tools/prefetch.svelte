<script lang="ts">
  import { browser } from "$app/environment";
  import { get } from "svelte/store";
  import { Sherlock } from "./sherlock/tauri-api";
  import { Infoga } from "./phone-infoga/tauri-api";
  import { BellingCatTg } from "./bellingcat-tg/tauri-api";

  if (browser) {
    get(Sherlock.statusQuery());
    get(Infoga.statusQuery());
    get(BellingCatTg.statusQuery());
  }
</script>
