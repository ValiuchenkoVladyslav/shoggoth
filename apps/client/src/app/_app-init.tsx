"use client";

import { useEffect } from "react";
import { useInfogaStatusQuery } from "~/tools/phone_infoga/tauri-api";
import { useAppConfig } from "~/tools/store";

export function AppInit() {
  const infogaStatus = useInfogaStatusQuery();

  // hooks should be called in the top
  if (typeof window === "undefined") {
    return null;
  }

  // init store (get values from localstorage)
  useAppConfig.getState().init();

  // update store with infoga status
  useEffect(() => {
    console.log(infogaStatus.data);
    if (infogaStatus.data) {
      useAppConfig.getState().setInfogaInstalled(infogaStatus.data);
    }
  }, [infogaStatus]);

  return null;
}
