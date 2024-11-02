<script lang="ts">
  import { browser } from "$app/environment";
  import { get } from "svelte/store";
  import { sherlockStatusQuery } from "./sherlock/tauri-api";

  if (browser) {
    get(sherlockStatusQuery());
  }
</script>
