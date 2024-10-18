"use client";

import {
  useSherlockInstallMutation,
  useSherlockStatusQuery,
} from "~/tools/sherlock/tauri-api";
import { PythonWarning, ToolSection } from "../tool-section";

export function Sherlock() {
  const installSherlock = useSherlockInstallMutation();
  const sherlockInstalled = !!useSherlockStatusQuery().data;

  return (
    <ToolSection
      title="Sherlock (Nickname search engine)"
      link="https://github.com/sherlock-project/sherlock"
      downloadMut={installSherlock}
      installed={sherlockInstalled}
    >
      <PythonWarning />
    </ToolSection>
  );
}
