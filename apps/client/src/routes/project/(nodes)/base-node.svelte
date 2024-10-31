<script lang="ts">
  import { CtxMenu } from "$lib/components";
  import { Handle, Position, useSvelteFlow } from "@xyflow/svelte";
  import { Trash2 } from "lucide-svelte";
  import type { Snippet } from "svelte";

  type BaseProps = {
    opts: Snippet;
    children: Snippet;
    id: string;
  };

  let { children, opts, id }: BaseProps = $props();

  const { deleteElements } = useSvelteFlow();
</script>

<Handle type="target" position={Position.Top} />
<CtxMenu {children}>
  {#snippet options()}
    {@render opts()}

    <button
      onclick={() => deleteElements({ nodes: [{ id }] })}
      class="text-red-600"
    >
      <Trash2 />
      Delete Node
    </button>
  {/snippet}
</CtxMenu>
<Handle type="source" position={Position.Bottom} />
