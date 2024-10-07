"use client";

import { useMutation } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import { ExternalLink } from "~/components/links";
import { Button } from "~/components/ui/button";

export function useInstallInfogaMutation() {
  return useMutation({
    mutationFn() {
      return invoke("install_infoga");
    },
  });
}

export function PhoneInfoga() {
  const installInfoga = useInstallInfogaMutation();

  if (installInfoga.isError) {
    console.error(installInfoga.error);
  }

  return (
    <article className="w-full layer-dark rounded-lg p-3 flex items-center">
      <ExternalLink
        className="font-bold text-xl hover:underline"
        href="https://github.com/sundowndev/phoneinfoga"
      >
        PhoneInfoga
      </ExternalLink>

      <Button
        onClick={() => {
          installInfoga.mutate();
        }}
        // disabled
      >
        Install
      </Button>
    </article>
  );
}
