import {
  createMutation,
  createQuery,
  useQueryClient,
} from "@tanstack/svelte-query";
import { invoke } from "@tauri-apps/api/core";

const sherlockQueryKey = ["sherlock_status"] as const;

/** {@link https://github.com/sherlock-project/sherlock Sherlock} (nickname lookup) */
export const Sherlock = {
  /** check if Sherlock is installed */
  statusQuery() {
    return createQuery({
      queryKey: sherlockQueryKey,
      queryFn: () => invoke<boolean>("sherlock_check"),
      staleTime: Number.POSITIVE_INFINITY,
    });
  },

  /** install Sherlock */
  installMut() {
    const queryClient = useQueryClient();

    return createMutation({
      mutationFn: () => invoke("sherlock_install"),
      onSuccess: () => queryClient.setQueryData(sherlockQueryKey, true),
    });
  },

  /** search nickname using Sherlock */
  searchNicknameMut() {
    return createMutation({
      mutationFn: (nickname: string) => invoke("sherlock_search", { nickname }),
    });
  },
};
