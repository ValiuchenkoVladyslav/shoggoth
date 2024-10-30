<script lang="ts">
  import { cn } from '$lib/utils';
  import type { HTMLTextareaAttributes } from 'svelte/elements';

  let { children, class: _class, ...props }: HTMLTextareaAttributes = $props();
</script>

<textarea
  class={cn("dark nowheel nodrag border border-2 border-gray-800 rounded-md py-1 px-2 min-h-[3lh]", _class)}
  {...props}
></textarea>
