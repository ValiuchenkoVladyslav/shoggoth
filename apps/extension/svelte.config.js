import staticAdapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: vitePreprocess(),

  kit: {
    adapter: {
      name: "Browser Extension Adapter",
      async adapt(builder) {
        staticAdapter().adapt(builder);

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

        builder.log("Compiling service worker...");

        await Bun.build({
          entrypoints: ["./src/service_worker.ts"],
          outdir: "./build",
          minify: true,
        });
      },
    },

    alias: {
      "~/gen/core": "../@shared/core/bindings",
      "~/gen/tauri": "../client/src-tauri/bindings",
      "~/styles": "../@shared/styles",
    },
  },
};
