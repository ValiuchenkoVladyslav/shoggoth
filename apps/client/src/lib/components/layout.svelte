<script lang="ts">
  import { cn } from "$lib/utils";
  import { GripVertical } from "lucide-svelte";
	import { Pane, PaneGroup, PaneResizer, type PaneAPI } from "paneforge";
  import type { Snippet } from "svelte";

  type LayoutProps = {
    sidebar: Snippet;
    children: Snippet;
    sidebarClasses?: string;
  };

  let { sidebar, children, sidebarClasses }: LayoutProps = $props();

  const sidebarDefaultSize = 13;

  let paneApi = $state<PaneAPI>();
  let sidebarRef = $state<HTMLElement>();
</script>

<svelte:window
  onkeydown={(evt) => {
    if (evt.ctrlKey && ["s", "ы"].includes(evt.key)) {
      evt.preventDefault();

      if (!paneApi?.getSize()) {
        return paneApi?.expand();
      }

      paneApi?.collapse();
    }
  }}
/>

<PaneGroup direction="horizontal">
	<Pane
    bind:el={sidebarRef}
    bind:pane={paneApi}

    defaultSize={sidebarDefaultSize}
    minSize={sidebarDefaultSize}
    maxSize={sidebarDefaultSize * 2.5}

    collapsible
    onExpand={() => sidebarRef?.classList.add("px-3")}
    onCollapse={() => sidebarRef?.classList.remove("px-3")}

    class={cn("px-3 pb-3 flexcol h-[calc(100vh-32px)]", sidebarClasses)}
  >
    {@render sidebar()}
  </Pane>

  <PaneResizer class="flex items-center w-0 h-[calc(100vh-32px)]">
    <div class="bg-gray-800 rounded-md z-[10] py-1 outline outline-2 translate-x-[-50%]">
      <GripVertical size={13} />
    </div>
  </PaneResizer>

	<Pane
    defaultSize={100 - sidebarDefaultSize}
    class="light rounded-tl-md h-[calc(100vh-32px)]"
  >
    {@render children()}
  </Pane>
</PaneGroup>
