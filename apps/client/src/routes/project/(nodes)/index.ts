import Nickname from "./nickname.svelte";
import Text from "./text.svelte";
import Url from "./url.svelte";

// biome-ignore lint/suspicious/noExplicitAny: weird svelteflow types
export const nodeTypes: any = {
  text: Text,
  url: Url,
  nickname: Nickname,
};
