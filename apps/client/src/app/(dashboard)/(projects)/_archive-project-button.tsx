"use client";

import { FileArchive } from "lucide-react";
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
import { useEditProjectMetaMutation } from "~/tauri-api/projects";

export function ArchiveProjectButton(
  props: ProjectMeta & { closeEditDialog: () => void },
) {
  const editProjectMeta = useEditProjectMetaMutation();

  const archiveText = props.archived ? "Unarchive" : "Archive";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="bg-yellow-600 text-white">
          <FileArchive size={18} />
          {archiveText}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[230px]">
        <DropdownMenuLabel className="text-lg">
          {archiveText} this project?
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="!text-yellow-600 font-bold"
          onClick={() => {
            setTimeout(() => {
              editProjectMeta.mutate({ ...props, archived: !props.archived });
              props.closeEditDialog();
            }, 200);
          }}
        >
          {archiveText}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
