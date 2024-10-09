"use client";

import { useInfogaStatusQuery } from "~/tools/phone_infoga/tauri-api";
import { useSherlockStatusQuery } from "~/tools/sherlock/tauri-api";

// disable some browser features in prod so app feels more native
if (process.env.NODE_ENV !== "development") {
  window.addEventListener("keydown", (e) => {
    if (["r", "f"].includes(e.key.toLowerCase()) && (e.ctrlKey || e.metaKey))
      e.preventDefault();

    if (e.key === "F5") e.preventDefault();
  });

  window.addEventListener("contextmenu", (e) => e.preventDefault());
}

export default function AppInit() {
  // prefetch tools
  useInfogaStatusQuery();
  useSherlockStatusQuery();

  return null;
}
