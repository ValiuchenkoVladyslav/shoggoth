"use client";

import { useStore } from "~/store";

export function Sidebar() {
  const projectMeta = useStore((state) => state.openProject);

  return (
    <div>
      <p className="opacity-70">{projectMeta?.desc}</p>
    </div>
  );
}
