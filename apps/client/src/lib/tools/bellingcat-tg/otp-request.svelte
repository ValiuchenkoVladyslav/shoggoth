<script lang="ts">
  import { Btn, Dialog, OtpInput } from "$lib/components";
  import { listen, emit } from "@tauri-apps/api/event";

  // svelte-ignore non_reactive_update
  let dialogRef: HTMLDialogElement;

  $effect(() => {
    const unlisten = listen("cat-otp-request", () => dialogRef.showModal());

    return () => unlisten.then(fn => fn());
  });

  // svelte-ignore non_reactive_update
  let otp = "";
</script>

<Dialog title="BELLINGCAT OTP REQUEST" bind:dialogRef>
  {#snippet options()}
    <Btn
      class="light"
      onclick={() => {
        if (otp.length === 5) emit("cat-otp", otp);
      }}
    >
      Submit
    </Btn>
  {/snippet}

  <OtpInput len={5} bind:value={otp} />
</Dialog>
