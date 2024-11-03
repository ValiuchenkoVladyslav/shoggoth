import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const l_numverifyKey = "NUMVERIFY_API_KEY";
export const numverifyKey = writable(
  (browser && localStorage.getItem(l_numverifyKey)) || "",
);

numverifyKey.subscribe(
  (val) => browser && localStorage.setItem(l_numverifyKey, val),
);

export const l_googleCSECX = "GOOGLE_CSE_CX";
export const googleCSECX = writable(
  (browser && localStorage.getItem(l_googleCSECX)) || "",
);

googleCSECX.subscribe(
  (val) => browser && localStorage.setItem(l_googleCSECX, val),
);

export const l_googleApiKey = "GOOGLE_API_KEY";
export const googleApiKey = writable(
  (browser && localStorage.getItem(l_googleApiKey)) || "",
);

googleApiKey.subscribe(
  (val) => browser && localStorage.setItem(l_googleApiKey, val),
);

export const l_CSEMaxResults = "GOOGLE_CSE_MAX_RESULTS";
export const CSEMaxResults = writable(
  (browser && Number(localStorage.getItem(l_CSEMaxResults))) || 10,
);

CSEMaxResults.subscribe(
  (val) => browser && localStorage.setItem(l_CSEMaxResults, String(val)),
);
