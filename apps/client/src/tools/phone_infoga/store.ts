import { create } from "zustand";
import { type InferParams, isBrowser } from "~/utils";

export const numverifyKeyStr = "NUMVERIFY_API_KEY";

export const googleCSECXStr = "GOOGLE_CSE_CX";
export const googleApiKeyStr = "GOOGLE_API_KEY";
export const googleCSEMaxResultsStr = "GOOGLE_CSE_MAX_RESULTS";

export const useInfogaEnvs = create((...args: unknown[]) => {
  const [set] = args as InferParams<typeof useInfogaEnvs>;

  return {
    numverifyKey: isBrowser ? localStorage.getItem(numverifyKeyStr) : null,
    setNumverifyKey(numverifyKey: string) {
      localStorage.setItem(numverifyKeyStr, numverifyKey);
      set({ numverifyKey });
    },

    googleCSECX: isBrowser ? localStorage.getItem(googleCSECXStr) : null,
    setGoogleCSECX(googleCSECX: string) {
      localStorage.setItem(googleCSECXStr, googleCSECX);
      set({ googleCSECX });
    },

    googleApiKey: isBrowser ? localStorage.getItem(googleApiKeyStr) : null,
    setGoogleApiKey(googleApiKey: string) {
      localStorage.setItem(googleApiKeyStr, googleApiKey);
      set({ googleApiKey });
    },

    googleCSEMaxResults: isBrowser
      ? localStorage.getItem(googleCSEMaxResultsStr) || 10
      : null,
    setGoogleCSEMaxResults(googleCSEMaxResults: number) {
      localStorage.setItem(googleCSEMaxResultsStr, String(googleCSEMaxResults));
      set({ googleCSEMaxResults });
    },
  };
});
