"use client";

import { useInfogaStatusQuery } from "~/tools/phone_infoga/tauri-api";
import { useSherlockStatusQuery } from "~/tools/sherlock/tauri-api";

export function AppInit() {
  // preload tools data
  useInfogaStatusQuery();
  useSherlockStatusQuery();

  return null;
}
