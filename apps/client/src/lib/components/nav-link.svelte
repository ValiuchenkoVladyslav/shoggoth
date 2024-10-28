<script lang="ts">
  import { page } from '$app/stores';
  import type { HTMLAnchorAttributes } from "svelte/elements";

  let { children, ...props }: Omit<HTMLAnchorAttributes, "aria-current"> & {
    aliases?: string[];
  } = $props();
</script>

<a
  aria-current={[props.href, ...(props.aliases ?? [])].includes($page.url.pathname) && "page"}
  {...props}
>
  {@render children?.()}
</a>
