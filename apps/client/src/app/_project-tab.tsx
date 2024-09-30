"use client";

import { NavLink } from "~/components/nav-link";
import { useStore } from "~/store";

export function ProjectTab() {
  const projectName = useStore((state) => state.openProject?.name);

  if (!projectName) return null;

  return <NavLink href="/project">{projectName}</NavLink>;
}
