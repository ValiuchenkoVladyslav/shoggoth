<script lang="ts">
	import "../app.css";
  import { browser } from "$app/environment";

	let { children } = $props();

  async function clientStatus() {
    if (!browser) throw new Error("SSR");

    return await fetch("http://localhost:2099/");
  }
</script>

{#snippet statusText(text: string)}
  <h2 class="font-bold text-center text-lg opacity-60">
    {text}
  </h2>
{/snippet}

{#await clientStatus()}
  {@render statusText("Fetching client status...")}
{:then}
  {@render children()}
{:catch}
  {@render statusText("Client is not running")}
{/await}
