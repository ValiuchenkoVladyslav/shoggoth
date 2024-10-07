import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import type { InfogaRes } from "~/gen/InfogaRes";
import { infogaQueryKey } from "./utils";

/** check if {@link https://github.com/sundowndev/phoneinfoga PhoneInfoga} is installed */
export function useInfogaStatusQuery() {
  return useQuery({
    queryKey: infogaQueryKey,
    queryFn: () => invoke<boolean>("infoga_check"),
    staleTime: Number.POSITIVE_INFINITY,
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
export function useInfogaScanMutation(phone: string) {
  return useMutation({
    mutationFn() {
      return invoke<InfogaRes>("infoga_scan", { phone });
    },
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
