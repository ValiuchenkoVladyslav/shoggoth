import {
  createMutation,
  createQuery,
  useQueryClient,
} from "@tanstack/svelte-query";
import { invoke } from "@tauri-apps/api/core";

const sherlockQueryKey = ["sherlock_status"] as const;

/** check if {@link https://github.com/sherlock-project/sherlock Sherlock} is installed */
export function sherlockStatusQuery() {
  return createQuery({
    queryKey: sherlockQueryKey,
    queryFn: () => invoke<boolean>("sherlock_check"),
    staleTime: Number.POSITIVE_INFINITY,
  });
}

/** install {@link https://github.com/sherlock-project/sherlock Sherlock} */
export function sherlockInstallMutation() {
  const queryClient = useQueryClient();

  return createMutation({
    mutationFn: () => invoke("sherlock_install"),
    onSuccess: () => queryClient.setQueryData(sherlockQueryKey, true),
    onError(error) {
      console.error(error); // TODO
    },
  });
}

/** search nickname using {@link https://github.com/sherlock-project/sherlock Sherlock} */
export function sherlockSearchMutation(nickname: string) {
  return createMutation({
    mutationFn: () => invoke("sherlock_search", { nickname }),
  });
}
