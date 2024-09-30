"use client";

import { Play } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import type { ProjectMeta } from "~/gen/ProjectMeta";
import { useStore } from "~/store";
import { cn } from "~/utils";
import { EditProjectDialog } from "./_edit-project-dialog";

export function ProjectCard(props: ProjectMeta) {
  const openProject = useStore((state) => state.setOpenProject);

  return (
    <article className="bg-gray-900 text-white p-3 rounded-lg">
      <h1
        className={cn(
          "text-lg font-bold line-clamp-1",
          props.archived && "opacity-60",
        )}
      >
        {props.name}
      </h1>
      <p
        className={cn(
          "line-clamp-3 h-[3lh] break-words",
          props.archived && "opacity-60",
        )}
      >
        {props.desc}
      </p>

      <div className="flex justify-between items-center pt-3">
        <time className="opacity-75">
          {new Date(Number(props.created_at)).toDateString()}
        </time>

        <div className="flex gap-2">
          <EditProjectDialog {...props} />

          <Link
            href="/project"
            onClick={() => openProject(props)}
            className={cn(buttonVariants(), "gap-1 h-[32px]")}
          >
            <Play width={16} />
            Open
          </Link>
        </div>
      </div>
    </article>
  );
}
