import country from "./country.svelte";
import nickname from "./nickname.svelte";
import phone from "./phone.svelte";
import telegram from "./telegram.svelte";
import text from "./text.svelte";
import url from "./url.svelte";

// biome-ignore lint/suspicious/noExplicitAny: weird svelteflow types
export const nodeTypes: Record<string, any> = {
  text,
  url,
  nickname,
  country,
  phone,
  telegram,
};
