import staticAdapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/**
 * @param {import('@sveltejs/adapter-static').AdapterOptions} options
 * @returns {import('@sveltejs/kit').Adapter}
 */
function extensionAdapter(options) {
  return {
    name: "Browser Extension Adapter",
    async adapt(builder) {
      builder.log("Building app to static...");

      staticAdapter(options).adapt(builder);

      builder.log("Removing inline scripts...");

      const htmlContent = new HTMLRewriter()
        .on("script", {
          element(scriptEl) {
            scriptEl.setAttribute("src", "./main.js");
          },
          text(scriptText) {
            Bun.write("./build/main.js", scriptText.text);

            scriptText.remove();
          },
        })
        .transform(await Bun.file("./build/index.html").text());

      await Bun.write("./build/index.html", htmlContent);
    },
  };
}

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: vitePreprocess(),

  kit: {
    adapter: extensionAdapter(),

    alias: {
      "~/gen/core": "../@shared/core/bindings",
      "~/gen/tauri": "../client/src-tauri/bindings",
    },
  },
};
