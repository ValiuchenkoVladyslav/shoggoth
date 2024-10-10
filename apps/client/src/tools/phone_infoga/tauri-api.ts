import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import type { InfogaRes } from "~/gen/tauri";
import { isBrowser } from "~/utils";
import {
  googleApiKeyStr,
  googleCSECXStr,
  googleCSEMaxResultsStr,
  numverifyKeyStr,
  useInfogaEnvs,
} from "./store";
import { infogaQueryKey, infogaStatusKey } from "./utils";

/** check if {@link https://github.com/sundowndev/phoneinfoga PhoneInfoga} is installed */
export function useInfogaStatusQuery() {
  return useQuery({
    queryKey: infogaQueryKey,
    async queryFn() {
      const result = await invoke<boolean>("infoga_check");

      localStorage.setItem(infogaStatusKey, String(result));

      return result;
    },
    staleTime: Number.POSITIVE_INFINITY,
    placeholderData:
      isBrowser && localStorage.getItem(infogaStatusKey) === "true",
  });
}

/** install {@link https://github.com/sundowndev/phoneinfoga PhoneInfoga} */
export function useInfogaInstallMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn() {
      return invoke("infoga_install");
    },
    onSuccess() {
      queryClient.setQueryData<boolean>(infogaQueryKey, true);
    },
  });
}

/** scan phone number {@link https://github.com/sundowndev/phoneinfoga PhoneInfoga} */
export function useInfogaScanMutation(
  phone: string,
  onSuccess?: (data: InfogaRes) => void,
) {
  const envs = useInfogaEnvs();

  return useMutation({
    mutationFn() {
      return invoke<InfogaRes>("infoga_scan", {
        envs: [
          [numverifyKeyStr, envs.numverifyKey ?? ""],
          [googleApiKeyStr, envs.googleApiKey ?? ""],
          [googleCSECXStr, envs.googleCSECX ?? ""],
          [googleCSEMaxResultsStr, envs.googleCSEMaxResults ?? ""],
        ],
        phone,
      });
    },
    onSuccess,
  });
}

/** search phone number in web using {@link https://github.com/sundowndev/phoneinfoga PhoneInfoga} */
export function useInfogaUrlsMutation(phone: string) {
  return useMutation({
    mutationFn() {
      return invoke("infoga_urls", { phone });
    },
  });
}
