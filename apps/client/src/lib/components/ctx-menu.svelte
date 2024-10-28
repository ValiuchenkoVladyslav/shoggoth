<script lang="ts">
  import type { Snippet } from "svelte";

  let open = $state<{ x: number; y: number; }>();

  type DialogProps = {
    options: Snippet;
    children: Snippet;
  };

  let { options, children }: DialogProps = $props();

  let ctxAreaRef: HTMLDivElement;
</script>

<svelte:window
  onclick={() => open = undefined}
  oncontextmenu={(evt) => {
    open = ctxAreaRef?.contains(evt.target as Node)
      ? { x: evt.clientX, y: evt.clientY }
      : undefined;
  }}
  onkeydown={(evt) => evt.key === "Escape" && (open = undefined)}
/>

<div bind:this={ctxAreaRef}>
  {@render children()}
</div>

<!-- &>div>button to fix dialogs -->
<div
  class={`
    fixed z-[5] dark flexcol gap-1 rounded-lg outline outline-2 font-bold
    [&>button]:flex [&>button]:items-center [&>button]:gap-2 [&>button]:p-2 [&>button:hover]:bg-white/15
    [&>div>button]:flex [&>div>button]:items-center [&>div>button]:gap-2 [&>div>button]:p-2 [&>div>button:hover]:bg-white/15
  `}
  style={open ? `top: ${open.y}px; left: ${open.x}px;` : "visibility: hidden;"}
>
  {@render options()}
</div>
