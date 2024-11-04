<script module lang="ts">
  import { Link } from "lucide-svelte";
  import type { Country } from "~/gen/core";

  export function countryInit(name = ""): Country {
    return { name };
  }

  export { Link as URLIcon };
</script>

<script lang="ts">
  import BaseNode from "./base-node.svelte";

  let { id, data }: TypedNode<Country> = $props();

  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  const country = data.name;

  let countryFull = $state(country);
  try {
    countryFull = regionNames.of(country) ?? "";
  } catch (e) {}
</script>

<BaseNode {id}>
  {#snippet opts()}
    <button>
      Edit
    </button>
  {/snippet}

  <div class={`
    rounded-full p-0 w-[160px] aspect-square fib fis flex justify-center
    ${"fi-" + country.toLowerCase()}
  `}>
    <h2 class="dark rounded-lg !h-fit text-center py-1 px-2">
      {countryFull}
    </h2>
  </div>
</BaseNode>
