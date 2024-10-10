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
  googleApiKeyStr,
  googleCSECXStr,
  googleCSEMaxResultsStr,
  numverifyKeyStr,
  useInfogaEnvs,
} from "~/tools/phone_infoga/store";
import {
  useInfogaInstallMutation,
  useInfogaStatusQuery,
} from "~/tools/phone_infoga/tauri-api";
import { ToolSection } from "./_tool-section";

export function PhoneInfoga() {
  const installInfoga = useInfogaInstallMutation();
  const infogaInstalled = !!useInfogaStatusQuery().data;
  const infogaEnvs = useInfogaEnvs();

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
          <Input
            placeholder={numverifyKeyStr}
            defaultValue={infogaEnvs.numverifyKey ?? ""}
            onChange={(e) => infogaEnvs.setNumverifyKey(e.target.value)}
          />
        </div>

        <div className="flexcol gap-2">
          <h3 className="text-base font-semibold">Google CSE</h3>
          <Input
            placeholder={googleCSECXStr}
            defaultValue={infogaEnvs.googleCSECX ?? ""}
            onChange={(e) => infogaEnvs.setGoogleCSECX(e.target.value)}
          />
          <Input
            placeholder={googleApiKeyStr}
            defaultValue={infogaEnvs.googleApiKey ?? ""}
            onChange={(e) => infogaEnvs.setGoogleApiKey(e.target.value)}
          />

          <span>{googleCSEMaxResultsStr} (default: 10)</span>
          <Input
            placeholder={googleCSEMaxResultsStr}
            defaultValue={infogaEnvs.googleCSEMaxResults ?? ""}
            onChange={(e) =>
              infogaEnvs.setGoogleCSEMaxResults(Number(e.target.value))
            }
          />
        </div>
      </section>
    </ToolSection>
  );
}
