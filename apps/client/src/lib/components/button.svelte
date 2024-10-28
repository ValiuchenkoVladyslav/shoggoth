<script lang="ts">
  import { cn } from '$lib/utils';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  let { children, class: _class, ...props }: HTMLButtonAttributes = $props();
</script>

<button
  class={cn("rounded-lg min-h-10 px-4 flex gap-2 items-center font-semibold", _class)}
  {...props}
>
  {@render children?.()}
</button>
