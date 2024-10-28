<script lang="ts">
  import { Btn, Dialog } from "$lib/components";
  import { SquarePlus } from "lucide-svelte";
</script>

<Dialog title="CREATE PROJECT">
  {#snippet trigger()}
    <Btn class="light">
      <SquarePlus size={20} />
      NEW PROJECT
    </Btn>
  {/snippet}

  {#snippet options()}
    <Btn class="light" onclick={(evt) => evt.stopPropagation()}>
      <SquarePlus size={20} />
      Create
    </Btn>
  {/snippet}

  <p>lall</p>
</Dialog>
