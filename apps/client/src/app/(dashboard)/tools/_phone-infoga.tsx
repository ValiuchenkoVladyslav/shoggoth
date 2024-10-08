"use client";

import {
  CheckCheck,
  Download,
  ExternalLinkIcon,
  LoaderCircle,
} from "lucide-react";
import { ExternalLink } from "~/components/links";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  useInfogaInstallMutation,
  useInfogaStatusQuery,
} from "~/tools/phone_infoga/tauri-api";
import { ToolSection } from "./_tool-section";

export function PhoneInfoga() {
  const installInfoga = useInfogaInstallMutation();
  const infogaInstalled = !!useInfogaStatusQuery().data;

  const buttonIcon = installInfoga.isPending ? (
    <LoaderCircle className="animate-spin" />
  ) : infogaInstalled ? (
    <CheckCheck />
  ) : (
    <Download />
  );

  return (
    <ToolSection
      headingLeft={
        <div className="flex gap-2 items-center">
          <h1>PhoneInfoga (Phone number lookup)</h1>

          <ExternalLink
            className="font-bold text-xl hover:underline text-white/75 hover:text-white"
            href="https://github.com/sundowndev/phoneinfoga"
          >
            <ExternalLinkIcon />
          </ExternalLink>
        </div>
      }
      headingRight={
        <Button
          onClick={(e) => {
            e.stopPropagation();
            installInfoga.mutate();
          }}
          disabled={infogaInstalled}
        >
          {buttonIcon}
          {infogaInstalled ? "Installed" : "Install"}
        </Button>
      }
    >
      <section className="flexcol gap-4">
        <div>
          <h2 className="text-xl font-semibold">Optional settings</h2>
          <ExternalLink
            className="text-base text-white/75 hover:text-white"
            href="https://sundowndev.github.io/phoneinfoga/getting-started/scanners/"
          >
            https://sundowndev.github.io/phoneinfoga/getting-started/scanners/
          </ExternalLink>
        </div>

        <div className="flexcol gap-2">
          <h3 className="text-base font-semibold">
            Numverify API (free 100 reqs/month; no cc required)
          </h3>
          <Input placeholder="NUMVERIFY_API_KEY" />
        </div>

        <div className="flexcol gap-2">
          <h3 className="text-base font-semibold">Googlecse</h3>
          <Input placeholder="GOOGLECSE_CX" />
          <Input placeholder="GOOGLE_API_KEY" />
          <Input placeholder="GOOGLECSE_MAX_RESULTS (default: 10)" />
        </div>
      </section>
    </ToolSection>
  );
}
