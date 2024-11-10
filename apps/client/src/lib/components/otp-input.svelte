<script lang="ts">
  type OTPProps = {
    len: number;
    value: string;
  };

  let { len, value = $bindable() }: OTPProps = $props();

  let inputs = $state<HTMLInputElement[]>([]);
  let values = $state(new Array(len).fill(""));
</script>

<div class="flex gap-1">
  {#each values as _, i}
    <input
      bind:this={inputs[i]}
      bind:value={values[i]}
      maxLength={1}
      class="
        w-12 h-12 text-center border border-2 border-white bg-gray-800 text-white
        {i === len - 1 ? "rounded-r-lg" : ""}
        {i ? "" : "rounded-l-lg"}
      "
      oninput={(evt) => {
        value = values.join("");

        if (evt.currentTarget.value && i < len - 1) inputs[i + 1].focus();
      }}
      onkeydown={(evt) => {
        if (evt.key === "Backspace" && !values[i] && i > 0) inputs[i - 1].focus();
      }}
    />
  {/each}
</div>
