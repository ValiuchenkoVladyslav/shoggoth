import { readFileSync, writeFileSync } from "node:fs";
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

        const htmlContent = readFileSync("./build/index.html").toString();

        writeFileSync(
          "./build/main.js",
          htmlContent.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i)[1],
        );

        writeFileSync(
          "./build/index.html",
          htmlContent.replace(/<script\b[^>]*>[\s\S]*?<\/script>/i, ""),
        );
      },
    },

    alias: {
      "~/gen/core": "../@shared/core/bindings",
      "~/gen/tauri": "../client/src-tauri/bindings",
      "~/styles": "../@shared/styles",
      "~/icons": "../@shared/icons",
    },
  },
};
