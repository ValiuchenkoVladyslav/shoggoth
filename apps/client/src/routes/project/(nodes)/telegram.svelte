<script module lang="ts">
  import type { TelegramUser } from "~/gen/core";
  import TgIcon from "$lib/components/telegram-icon.svelte";

  export function tgInit(username = ""): TelegramUser {
    return { username };
  }

  export { TgIcon };
</script>

<script lang="ts">
  import { BaseNode } from "./(utils)";
  import { Phone } from "lucide-svelte";

  let { id, data }: TypedNode<TelegramUser> = $props();
</script>

<BaseNode {id}>
  {#snippet opts()}
    <p>placeholder</p>
  {/snippet}

  <div class="w-64 dark rounded-lg py-2 px-3 flexcol gap-2">
    <h2 class="flex gap-2 items-center">
      <TgIcon width={22} />
      TELEGRAM
    </h2>

    <section class="cursor-auto select-text nodrag">
      <h2 class="text-lg break-words font-semibold">
        {data.first_name}
        {data.last_name}
      </h2>

      {#if data.username}
        <p class="font-semibold text-blue-500">@{data.username}</p>
      {/if}

      {#each data.usernames ?? [] as username}
        <p class="font-semibold text-blue-500">
          @{username}
        </p>
      {/each}

      {#if data.id}
        <p class="font-medium">
          ID: <code>{data.id}</code>
        </p>
      {/if}
    </section>

    {#if data.phone}
      <div class="flex gap-2 cursor-auto select-text nodrag">
        <Phone width={18} />
        {data.phone}
      </div>
    {/if}

    {#if data.bot || data.verified || data.premium || data.fake}
      <section class="flex flex-wrap gap-1">
        {#if data.bot}
          <div class="light rounded-md px-2 py-0.5">
            bot
          </div>
        {/if}

        {#if data.verified}
          <div class="bg-green-600 text-white rounded-md px-2 py-0.5">
            verified
          </div>
        {/if}

        {#if data.premium}
          <div class="bg-pink-600 text-white rounded-md px-2 py-0.5">
            premium
          </div>
        {/if}

        {#if data.fake}
          <div class="bg-red-600 text-white rounded-md px-2 py-0.5">
            scam
          </div>
        {/if}
      </section>
    {/if}
  </div>
</BaseNode>
