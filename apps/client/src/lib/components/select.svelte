<script lang="ts">
  import { ChevronDown, ChevronUp } from "lucide-svelte";
  import type { Snippet } from "svelte";

  type Props = {
    initText: string;
    value?: string;
    children: Snippet;
  };

  let { initText, children, value = $bindable() }: Props = $props();

  let detailsRef: HTMLDetailsElement;
  let summaryRef = $state<Element>();
  // save original width of details
  let width = $derived(summaryRef?.getBoundingClientRect().width);

  let open = $state(false);

  let textValue = $state<string>();
</script>

<details bind:this={detailsRef} bind:open>
  <summary
    bind:this={summaryRef}
    class="
      cursor-pointer select-none light rounded-lg h-full flex items-center justify-between px-3 gap-3 font-semibold
      {open ? "rounded-b-none" : ""}
    "
    style={width ? `width: ${width}px` : ""}
  >
    {textValue || initText}

    {#if open}
      <ChevronUp size={20} />
    {:else}
      <ChevronDown size={20} />
    {/if}
  </summary>

  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <menu
    onclick={(evt) => {
      const option = (evt.target as Element).closest("option");
      if (!option) return;

      open = false;
      value = option.value;
      textValue = option.textContent ?? value;
    }}
    class="
      light rounded-b-lg fixed
      outline outline-2 outline-black outline-t-0
      *:p-2 hover:*:bg-black/10 hover:*:cursor-pointer *:font-semibold
    "
    style={width ? `width: ${width}px` : ""}
  >
    {@render children()}
  </menu>
</details>

<svelte:window
  onmousedown={(e) => detailsRef?.contains(e.target as Node) || (open = false)}
  onkeydown={(e) => e.key === "Escape" && (open = false)}
/>
