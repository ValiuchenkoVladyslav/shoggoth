import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import { errorToast } from "~/components/toasts";
import { isBrowser } from "~/utils";
import { sherlockQueryKey, sherlockStatusKey } from "./utils";

/** check if {@link https://github.com/sherlock-project/sherlock Sherlock} is installed */
export function useSherlockStatusQuery() {
  return useQuery({
    queryKey: sherlockQueryKey,
    async queryFn() {
      const result = await invoke<boolean>("sherlock_check");

      localStorage.setItem(sherlockStatusKey, String(result));

      return result;
    },
    staleTime: Number.POSITIVE_INFINITY,
    placeholderData:
      isBrowser && localStorage.getItem(sherlockStatusKey) === "true",
  });
}

/** install {@link https://github.com/sherlock-project/sherlock Sherlock} */
export function useSherlockInstallMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn() {
      return invoke("sherlock_install");
    },
    onSuccess() {
      queryClient.setQueryData(sherlockQueryKey, true);
    },
    onError(error) {
      errorToast("Failed to install Sherlock!", error);
    },
  });
}

/** search nickname using {@link https://github.com/sherlock-project/sherlock Sherlock} */
export function useSherlockSearchMutation(nickname: string) {
  return useMutation({
    mutationFn() {
      return invoke("sherlock_search", { nickname });
    },
  });
}
