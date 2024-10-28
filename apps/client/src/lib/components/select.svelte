<script lang="ts">
  import type { Snippet } from "svelte";
  import { ChevronDown, ChevronUp } from "lucide-svelte";

  type SelectProps = {
    initialText: string;
    value?: string;
    children: Snippet;
  };

  let { initialText, children, value = $bindable() }: SelectProps = $props();

  let open = $state(false);

  let textValue = $state<string>();

  let btnRef = $state<HTMLButtonElement>();
  // to save original width of button
  let width = $derived(btnRef?.getBoundingClientRect().width);
</script>

<svelte:window
  onclick={(e) => (open && !btnRef?.contains(e.target as Node)) && (open = false)}
  oncontextmenu={(e) => (open && !btnRef?.contains(e.target as Node)) && (open = false)}
  onkeydown={(e) => e.key === "Escape" && (open = false)}
/>

<div>
  <button
    bind:this={btnRef}
    class={`
      light min-w-36 rounded-lg min-h-10 flex items-center justify-between px-3 gap-3 font-semibold
      ${open ? "rounded-b-none" : ""}
    `}
    style={width ? `width: ${width}px` : ""}
    onclick={() => open = !open}
  >
    {textValue || initialText}

    {#if open}
      <ChevronUp size={20} />
    {:else}
      <ChevronDown size={20} />
    {/if}
  </button>

  {#if open}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <menu
      onclick={(evt) => {
        open = false;

        value = (evt.target as Element).closest("option")?.value;
        textValue = (evt.target as Element).closest("option")?.textContent ?? undefined;
      }}
      class={`
        light rounded-b-lg absolute
        outline outline-2 outline-black outline-t-0
        *:p-2 hover:*:bg-black/10 hover:*:cursor-pointer *:font-semibold
      `}
      style={`width: ${width}px`}
    >
      {@render children()}
    </menu>
  {/if}
</div>
