"use client";

import { Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { ProjectMeta } from "~/gen/ProjectMeta";
import { useDeleteProjectMutation } from "~/tauri-api/projects";

export function DeleteProjectButton({ id }: Pick<ProjectMeta, "id">) {
  const deleteProject = useDeleteProjectMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="destructive" className="gap-2">
          <Trash2 size={18} />
          Delete
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[230px]">
        <DropdownMenuLabel>
          <h3 className="text-lg">Delete this project?</h3>
          <p className="text-sm opacity-75">
            Better consider archiving it for future references.
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="!text-red-600 font-bold"
          onClick={() => setTimeout(() => deleteProject.mutate(id), 200)}
        >
          Yes, I want to delete it
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
