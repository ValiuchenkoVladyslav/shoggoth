import { create } from "zustand";
import type { InferParams } from "../utils";

const infogaKey = "infoga_installed";

export const useAppConfig = create((...args: unknown[]) => {
  const [set] = args as InferParams<typeof useAppConfig>;

  return {
    infogaInstalled: false,

    setInfogaInstalled(value: boolean) {
      localStorage.setItem(infogaKey, String(value));
      set({ infogaInstalled: value });
    },

    init() {
      set({
        infogaInstalled: localStorage.getItem(infogaKey) === "true",
      });
    },
  };
});
