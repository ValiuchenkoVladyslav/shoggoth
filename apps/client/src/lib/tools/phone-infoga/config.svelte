<script lang="ts">
  import { browse } from "$lib/utils";
  import Tool from "../tool.svelte";
  import { Infoga } from "./tauri-api";
  import {
    numverifyKey, l_numverifyKey,
    googleCSECX, l_googleCSECX,
    googleApiKey, l_googleApiKey,
    CSEMaxResults, l_CSEMaxResults,
  } from "./store";
</script>

<Tool
  name="PhoneInfoga (Phone number lookup)"
  url="https://github.com/sundowndev/phoneinfoga"
  checkQuery={Infoga.statusQuery}
  installMut={Infoga.installMut}
>
  <h2>Optional Settings</h2>
  <button
    class="opacity-75 hover:opacity-100"
    onclick={(e) => browse(e.currentTarget.textContent!)}
  >
    https://sundowndev.github.io/phoneinfoga/getting-started/scanners/
  </button>

  <h3 class="pt-4 pb-0.5">Numverify API (free 100 reqs/month; no CC required)</h3>
  <input
    placeholder={l_numverifyKey}
    value={$numverifyKey}
    onchange={(e) => numverifyKey.set(e.currentTarget.value)}
    class="dark px-3 py-2 rounded-md border border-2 border-gray-800 w-full"
  />

  <h3 class="pt-2 pb-0.5">Google CSE CX</h3>
  <input
    placeholder={l_googleCSECX}
    value={$googleCSECX}
    onchange={(e) => googleCSECX.set(e.currentTarget.value)}
    class="dark px-3 py-2 rounded-md border border-2 border-gray-800 w-full"
  />

  <h3 class="pt-2 pb-0.5">Google API Key</h3>
  <input
    placeholder={l_googleApiKey}
    value={$googleApiKey}
    onchange={(e) => googleApiKey.set(e.currentTarget.value)}
    class="dark px-3 py-2 rounded-md border border-2 border-gray-800 w-full"
  />

  <h3 class="pt-2 pb-0.5">CSE Max Results</h3>
  <input
    placeholder={l_CSEMaxResults}
    value={$CSEMaxResults}
    onchange={(e) => CSEMaxResults.set(Number(e.currentTarget.value))}
    class="dark px-3 py-2 rounded-md border border-2 border-gray-800 w-full"
  />
</Tool>
