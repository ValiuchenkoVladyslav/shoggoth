import staticAdapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: vitePreprocess(),

  kit: {
    adapter: staticAdapter(),

    alias: {
      "~/gen/core": "../@shared/core/bindings",
      "~/gen/tauri": "../client/src-tauri/bindings",
      "~/styles": "../@shared/styles",
    },
  },
};
