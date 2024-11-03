import {
  createMutation,
  createQuery,
  useQueryClient,
} from "@tanstack/svelte-query";
import { invoke } from "@tauri-apps/api/core";
import { get } from "svelte/store";
import type { Phone } from "~/gen/core";
import {
  CSEMaxResults,
  googleApiKey,
  googleCSECX,
  l_CSEMaxResults,
  l_googleApiKey,
  l_googleCSECX,
  l_numverifyKey,
  numverifyKey,
} from "./store";

const infogaQueryKey = ["infoga_status"] as const;

/** {@link https://github.com/sundowndev/phoneinfoga PhoneInfoga} (phone number scan) */
export const Infoga = {
  /** check if infoga is installed */
  statusQuery() {
    return createQuery({
      queryKey: infogaQueryKey,
      queryFn: () => invoke<boolean>("infoga_check"),
      staleTime: Number.POSITIVE_INFINITY,
    });
  },

  /** install infoga */
  installMut() {
    const queryClient = useQueryClient();

    return createMutation({
      mutationFn: () => invoke("infoga_install"),
      onSuccess: () => queryClient.setQueryData(infogaQueryKey, true),
    });
  },

  /** scan phone number  */
  scanMut() {
    return createMutation({
      mutationFn: (phone: string) =>
        invoke<Phone>("infoga_scan", {
          phone,
          envs: [
            [l_numverifyKey, get(numverifyKey)],
            [l_googleApiKey, get(googleApiKey)],
            [l_googleCSECX, get(googleCSECX)],
            [l_CSEMaxResults, String(get(CSEMaxResults))],
          ],
        }),
    });
  },

  /** search phone number in web */
  urlsMut() {
    return createMutation({
      mutationFn: (phone: string) => invoke("infoga_urls", { phone }),
    });
  },
};
