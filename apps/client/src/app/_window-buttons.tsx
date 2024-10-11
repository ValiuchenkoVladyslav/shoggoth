"use client";

import type { Webview } from "@tauri-apps/api/webview";
import { Maximize, X } from "lucide-react";
import { isBrowser } from "~/utils";

let appWindow: Webview | null = null;

if (isBrowser) {
  import("@tauri-apps/api/webview").then((windowApi) => {
    appWindow = windowApi.getCurrentWebview();
  });
}

export function WindowButtons() {
  return (
    <>
      <button
        type="button"
        onClick={() => appWindow?.window.minimize()}
        className="hover:bg-[rgba(255,255,255,.10)]"
      >
        <svg fill="white" width="16px" height="16px" viewBox="0 0 52 52">
          <path d="M50,48.5c0,0.8-0.7,1.5-1.5,1.5h-45C2.7,50,2,49.3,2,48.5v-3C2,44.7,2.7,44,3.5,44h45 c0.8,0,1.5,0.7,1.5,1.5V48.5z" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => appWindow?.window.maximize()}
        className="hover:bg-[rgba(255,255,255,.10)]"
      >
        <Maximize size={20} />
      </button>

      <button
        type="button"
        onClick={() => appWindow?.window.close()}
        className="hover:bg-red-700"
      >
        <X size={24} />
      </button>
    </>
  );
}
