"use client";

import { useRouter } from "next/navigation";
import { NavLink } from "~/components/links";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import { useProject } from "~/projects/store";

export function ProjectTab() {
  const { project, openProject } = useProject();
  const router = useRouter();

  return (
    project && (
      <ContextMenu>
        <ContextMenuTrigger>
          <NavLink
            href="/project"
            className="opacity-60 hover:opacity-100 aria-[current=page]:opacity-100"
          >
            {project.name}
          </NavLink>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            className="text-red-600 !hover:text-red-600"
            onClick={() => openProject(null, router)}
          >
            Close
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
  );
}
