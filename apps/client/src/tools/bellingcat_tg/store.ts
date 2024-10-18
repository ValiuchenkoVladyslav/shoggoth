import { create } from "zustand";
import { type InferParams, isBrowser } from "~/utils";

export const apiIdKey = "API_ID";
export const apiHashKey = "API_HASH";
export const phoneNumberKey = "PHONE_NUMBER";

export const useCatTgEnvs = create((...args: unknown[]) => {
  const [set] = args as InferParams<typeof useCatTgEnvs>;

  return {
    apiId: isBrowser && localStorage.getItem(apiIdKey),
    setApiId(apiId: string) {
      localStorage.setItem(apiIdKey, apiId);
      set({ apiId });
    },

    apiHash: isBrowser && localStorage.getItem(apiHashKey),
    setApiHash(apiHash: string) {
      localStorage.setItem(apiHashKey, apiHash);
      set({ apiHash });
    },

    phoneNumber: isBrowser && localStorage.getItem(phoneNumberKey),
    setPhoneNumber(phoneNumber: string) {
      localStorage.setItem(phoneNumberKey, phoneNumber);
      set({ phoneNumber });
    },
  };
});
