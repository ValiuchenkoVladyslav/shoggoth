console.log("\nCompiling service worker...");

Bun.build({
  entrypoints: ["./src/service_worker.ts"],
  outdir: "./build",
  minify: true,
}).then(() => console.log("Done!"));
