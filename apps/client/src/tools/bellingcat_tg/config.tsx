"use client";

import { ExternalLink } from "~/components/links";
import { Input } from "~/components/ui/input";
import { PhoneInput } from "~/components/ui/phone-input";
import { PythonWarning, ToolSection } from "../tool-section";
import { apiHashKey, apiIdKey, phoneNumberKey, useCatTgEnvs } from "./store";
import { useCatTgInstallMutation, useCatTgStatusQuery } from "./tauri-api";

export function BellingcatTg() {
  const installCat = useCatTgInstallMutation();
  const catInstalled = !!useCatTgStatusQuery().data;
  const catEnvs = useCatTgEnvs();

  return (
    <ToolSection
      title="telegram-phone-number-checker"
      link="https://github.com/bellingcat/telegram-phone-number-checker"
      downloadMut={installCat}
      installed={catInstalled}
    >
      <PythonWarning />

      <section className="flexcol gap-2 mt-4">
        <ExternalLink
          className="text-base text-white/75 hover:text-white"
          href="https://my.telegram.org/"
        >
          https://my.telegram.org/
        </ExternalLink>

        <h3 className="text-base font-semibold">TELEGRAM API ID</h3>
        <Input
          placeholder={apiIdKey}
          defaultValue={catEnvs.apiId || ""}
          onChange={(e) => catEnvs.setApiId(e.target.value)}
        />

        <h3 className="text-base font-semibold">TELEGRAM API HASH</h3>
        <Input
          placeholder={apiHashKey}
          defaultValue={catEnvs.apiHash || ""}
          onChange={(e) => catEnvs.setApiHash(e.target.value)}
        />

        <h3 className="text-base font-semibold">YOUR TELEGRAM PHONE NUMBER</h3>
        <PhoneInput
          placeholder={phoneNumberKey}
          value={catEnvs.phoneNumber || ""}
          onChange={(e) => catEnvs.setPhoneNumber(e)}
        />
      </section>
    </ToolSection>
  );
}
