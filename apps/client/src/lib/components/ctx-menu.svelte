<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    options: Snippet;
    children: Snippet;
    open?: { x: number; y: number; };
  };

  let { options, children, open = $bindable() }: Props = $props();

	let ctxRef: HTMLDivElement;
  let ctxAreaRef: HTMLDivElement;

  let ctxId = String(Math.random()); // to handle nested ctx menus

  function hideCtx() {
    open = undefined;
    ctxRef.hidePopover();
  }
</script>

<div bind:this={ctxAreaRef} data-ctx={ctxId}>
  {@render children()}
</div>

<div
  popover="manual"
  bind:this={ctxRef}
  style={open ? `margin: ${open.y}px 0 0 ${open.x}px;` : "visibility: hidden;"}
  class={`
    flexcol dark gap-1 rounded-lg outline outline-2 font-bold p-0
    [&>button]:flex [&>button]:items-center [&>button]:gap-2 [&>button]:p-2 [&>button:hover]:bg-white/15
    [&>div>button]:flex [&>div>button]:items-center [&>div>button]:gap-2 [&>div>button]:p-2 [&>div>button:hover]:bg-white/15
  `}
>
  {@render options()}
</div>

<svelte:window
  onclick={hideCtx}
  oncontextmenu={(evt) => {
    if (!ctxAreaRef?.contains(evt.target as Node)) return hideCtx();

    const closestCtx = (evt.target as Element | null)?.closest("[data-ctx]");

    if (closestCtx?.getAttribute("data-ctx") !== ctxId) return hideCtx();

    open = { x: evt.clientX, y: evt.clientY };
    ctxRef.showPopover();
  }}
  onkeydown={(evt) => evt.key === "Escape" && hideCtx()}
/>
