import {
  createMutation,
  createQuery,
  useQueryClient,
} from "@tanstack/svelte-query";
import { invoke } from "@tauri-apps/api/core";
import { get } from "svelte/store";
import type { TelegramUser } from "~/gen/core";
import {
  l_tgApiHash,
  l_tgApiId,
  l_tgPhone,
  tgApiHash,
  tgApiId,
  tgPhone,
} from "./store";

const cattgQueryKey = ["cattg_status"] as const;

/** {@link https://github.com/bellingcat/telegram-phone-number-checker BellingCat Telegram Checker} (check phone number in telegram) */
export const BellingCatTg = {
  /** check if tool is installed */
  statusQuery() {
    return createQuery({
      queryKey: cattgQueryKey,
      queryFn: () => invoke<boolean>("cattg_check"),
      staleTime: Number.POSITIVE_INFINITY,
    });
  },

  /** install tool */
  installMut() {
    const queryClient = useQueryClient();

    return createMutation({
      mutationFn: () => invoke<boolean>("cattg_install"),
      onSuccess: () => queryClient.setQueryData(cattgQueryKey, true),
    });
  },

  /** check if phone number is registered in telegram */
  tgCheck() {
    return createMutation({
      mutationFn(phone: string) {
        return invoke<TelegramUser>("cattg_phone", {
          phone,
          envs: [
            [l_tgApiId, get(tgApiId)],
            [l_tgApiHash, get(tgApiHash)],
            [l_tgPhone, get(tgPhone)],
          ],
        });
      },
    });
  },
};
