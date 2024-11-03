<script lang="ts">
  import { browse } from "$lib/utils";
  import PythonWarn from "../python-warn.svelte";
  import Tool from "../tool.svelte";
  import { l_tgApiHash, l_tgApiId, l_tgPhone, tgApiHash, tgApiId, tgPhone } from "./store";
  import { BellingCatTg } from "./tauri-api";
</script>

<Tool
  name="Bellingcat Telegram Checker"
  url="https://github.com/bellingcat/telegram-phone-number-checker"
  checkQuery={BellingCatTg.statusQuery}
  installMut={BellingCatTg.installMut}
>
  <PythonWarn />

  <h2 class="py-4">Optional Settings</h2>
  <button
    class="opacity-75 hover:opacity-100"
    onclick={(e) => browse(e.currentTarget.textContent!)}
  >
    https://my.telegram.org/
  </button>

  <h3 class="pt-2 pb-0.5">Telegram API ID</h3>
  <input
    placeholder={l_tgApiId}
    value={$tgApiId}
    onchange={(e) => tgApiId.set(e.currentTarget.value)}
    class="dark px-3 py-2 rounded-md border border-2 border-gray-800 w-full"
  />

  <h3 class="pt-2 pb-0.5">Telegram API Hash</h3>
  <input
    placeholder={l_tgApiHash}
    value={$tgApiHash}
    onchange={(e) => tgApiHash.set(e.currentTarget.value)}
    class="dark px-3 py-2 rounded-md border border-2 border-gray-800 w-full"
  />

  <h3 class="pt-2 pb-0.5">Your Telegram Phone Number</h3>
  <input
    placeholder={l_tgPhone}
    value={$tgPhone}
    onchange={(e) => tgPhone.set(e.currentTarget.value)}
    class="dark px-3 py-2 rounded-md border border-2 border-gray-800 w-full"
  />
</Tool>
