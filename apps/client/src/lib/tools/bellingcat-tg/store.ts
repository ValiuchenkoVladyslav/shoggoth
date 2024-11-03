import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const l_tgApiId = "API_ID";
export const tgApiId = writable(
  (browser && localStorage.getItem(l_tgApiId)) || "",
);

tgApiId.subscribe((val) => browser && localStorage.setItem(l_tgApiId, val));

export const l_tgApiHash = "API_HASH";
export const tgApiHash = writable(
  (browser && localStorage.getItem(l_tgApiHash)) || "",
);

tgApiHash.subscribe((val) => browser && localStorage.setItem(l_tgApiHash, val));

export const l_tgPhone = "PHONE_NUMBER";
export const tgPhone = writable(
  (browser && localStorage.getItem(l_tgPhone)) || "",
);

tgPhone.subscribe((val) => browser && localStorage.setItem(l_tgPhone, val));
