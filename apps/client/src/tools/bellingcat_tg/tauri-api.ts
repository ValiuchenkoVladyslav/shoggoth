import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import { errorToast } from "~/components/toasts";
import type { CatPhone } from "~/gen/tauri";
import { isBrowser } from "~/utils";
import { apiHashKey, apiIdKey, phoneNumberKey, useCatTgEnvs } from "./store";
import { cattgQueryKey, cattgStatusKey } from "./utils";

/** check if https://github.com/bellingcat/telegram-phone-number-checker is installed */
export function useCatTgStatusQuery() {
  return useQuery({
    queryKey: cattgQueryKey,
    async queryFn() {
      await invoke<boolean>("cattg_check");

      localStorage.setItem(cattgStatusKey, "true");

      return true;
    },
    staleTime: Number.POSITIVE_INFINITY,
    placeholderData:
      isBrowser && localStorage.getItem(cattgStatusKey) === "true",
  });
}

/** install https://github.com/bellingcat/telegram-phone-number-checker */
export function useCatTgInstallMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn() {
      return invoke("cattg_install");
    },
    onSuccess() {
      queryClient.setQueryData(cattgQueryKey, true);
    },
    onError(error) {
      errorToast("Failed to install telegram-phone-number-checker!", error);
    },
  });
}

/** check telegram using https://github.com/bellingcat/telegram-phone-number-checker */
export function useCatTgCheckMutation(
  phone: string,
  onSuccess?: (data: CatPhone) => void,
) {
  const envs = useCatTgEnvs();

  return useMutation({
    mutationFn() {
      return invoke<CatPhone>("cattg_phone", {
        envs: [
          [apiIdKey, envs.apiId || ""],
          [apiHashKey, envs.apiHash || ""],
          [phoneNumberKey, envs.phoneNumber || ""],
        ],
        phone,
      });
    },
    onSuccess,
  });
}
