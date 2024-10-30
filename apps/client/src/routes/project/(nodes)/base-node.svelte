<script lang="ts">
  import { CtxMenu } from '$lib/components';
  import { Handle, Position } from '@xyflow/svelte';
  import type { Snippet } from 'svelte';
  import { nodes } from '../store';

  type BaseProps = {
    opts: Snippet;
    children: Snippet;
    id: string;
  };

  let { children, opts, id }: BaseProps = $props();
</script>

<Handle type="target" position={Position.Top} />
<CtxMenu {children}>
  {#snippet options()}
    {@render opts()}

    <button
      onclick={() => nodes.update((old) => old.filter((n) => n.id !== id))}
      class="text-red-600"
    >
      Delete Node
    </button>
  {/snippet}
</CtxMenu>
<Handle type="source" position={Position.Bottom} />
