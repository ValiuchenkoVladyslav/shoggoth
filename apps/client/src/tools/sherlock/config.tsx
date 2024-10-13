"use client";

import {
  CheckCheck,
  Download,
  ExternalLinkIcon,
  LoaderCircle,
} from "lucide-react";
import { ExternalLink } from "~/components/links";
import { Button } from "~/components/ui/button";
import {
  useSherlockInstallMutation,
  useSherlockStatusQuery,
} from "~/tools/sherlock/tauri-api";
import { ToolSection } from "../tool-section";

export function Sherlock() {
  const installSherlock = useSherlockInstallMutation();
  const sherlockInstalled = !!useSherlockStatusQuery().data;

  const buttonIcon = installSherlock.isPending ? (
    <LoaderCircle className="animate-spin" />
  ) : sherlockInstalled ? (
    <CheckCheck />
  ) : (
    <Download />
  );

  return (
    <ToolSection
      headingLeft={
        <div className="flex gap-2 items-center">
          <h1>Sherlock (Nickname search engine)</h1>

          <ExternalLink
            className="font-bold text-xl hover:underline text-white/75 hover:text-white"
            href="https://github.com/sherlock-project/sherlock"
          >
            <ExternalLinkIcon />
          </ExternalLink>
        </div>
      }
      headingRight={
        <Button
          onClick={(e) => {
            e.stopPropagation();
            installSherlock.mutate();
          }}
          disabled={sherlockInstalled}
        >
          {buttonIcon}
          {sherlockInstalled ? "Installed" : "Install"}
        </Button>
      }
    >
      <h1 className="text-base text-yellow-600 font-semibold">
        It's a python tool so you need python installed in order to use it!
      </h1>
    </ToolSection>
  );
}
