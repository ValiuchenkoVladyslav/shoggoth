<script lang="ts">
  import { Ban } from "lucide-svelte";
  import type { Snippet } from "svelte";
  import Button from "./button.svelte";

  type DialogProps = {
    title: string;
    options?: Snippet;
    trigger: Snippet;
    children: Snippet;
  };

  let { title, trigger, options, children }: DialogProps = $props();

	let dialogRef: HTMLDialogElement;
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
  bind:this={dialogRef}
  onclick={(evt) => {
    const rect = dialogRef.getBoundingClientRect();

    if (!(
      rect.top <= evt.clientY
      && evt.clientY <= rect.top + rect.height
      && rect.left <= evt.clientX
      && evt.clientX <= rect.left + rect.width
    )) {
      dialogRef.close();
    }
  }}
  class="py-4 px-5 dark min-w-[330px] rounded-lg outline outline-2 backdrop:bg-black/50"
>
  <h1>{title}</h1>
  <section class="py-2">
    {@render children()}
  </section>

  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <section
    class="mt-6 flex gap-3 items-center"
    onclick={(evt) => (evt.target as Element).closest("button") && dialogRef.close()}
  >
    {@render options?.()}

    <Button class="hover:bg-white/15">
      <Ban size={20} />
      Cancel
    </Button>
  </section>
</dialog>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={() => dialogRef.showModal()}>
  {@render trigger()}
</div>
