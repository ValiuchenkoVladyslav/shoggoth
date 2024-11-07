<script lang="ts">
  import { CtxMenu } from "$lib/components";
  import { useSvelteFlow } from "@xyflow/svelte";
  import type { Snippet } from "svelte";
  import { nodes } from "./store";
  import { newId } from "$lib/utils";

  import { textInit, TextIcon } from "./(nodes)/text.svelte";  
  import { URLIcon, urlInit } from "./(nodes)/url.svelte";
  import { NicknameIcon, nicknameInit } from "./(nodes)/nickname.svelte";
  import { countryInit } from "./(nodes)/country.svelte";
  import { Flag } from "lucide-svelte";
  import { phoneInit, PhoneIcon } from "./(nodes)/phone.svelte";
  import TelegramIcon from "$lib/components/telegram-icon.svelte";
  import { tgInit } from "./(nodes)/telegram.svelte";

  type Props = {
    children: Snippet;
    open?: { x: number; y: number; };
  }

  let { children, open }: Props = $props();

  const { screenToFlowPosition } = useSvelteFlow();

  function addNode(type: string, data: () => Record<string, unknown>) {
    return (evt: MouseEvent) => nodes.update((old) => [...old, {
      id: newId("from-tmp-"),
      position: screenToFlowPosition({ x: evt.clientX, y: evt.clientY }),
      type,
      data: data(),
    }]);
  }
</script>

<CtxMenu bind:open>
  {#snippet options()}
    <button onclick={addNode("text", textInit)}>
      <TextIcon />
      Add Text
    </button>
    <button onclick={addNode("url", urlInit)}>
      <URLIcon />
      Add URL
    </button>
    <button onclick={addNode("nickname", nicknameInit)}>
      <NicknameIcon />
      Add Nickname
    </button>
    <button onclick={addNode("country", countryInit)}>
      <Flag />
      Add Country
    </button>
    <button onclick={addNode("phone", phoneInit)}>
      <PhoneIcon />
      Add Phone
    </button>
    <button onclick={addNode("telegram", tgInit)}>
      <TelegramIcon width={24} />
      Add Telegram
    </button>
  {/snippet}

  <div class="h-[calc(100vh-32px)]">
    {@render children()}
  </div>
</CtxMenu>
