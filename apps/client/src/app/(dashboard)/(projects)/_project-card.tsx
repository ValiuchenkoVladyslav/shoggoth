import { FileArchive, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import type { ProjectMeta } from "~/gen/ProjectMeta";
import { useProject } from "~/store";
import { cn } from "~/utils";
import { ArchiveProject } from "./_archive-project";
import { DeleteProject } from "./_delete-project";
import { EditDialog } from "./_edit-project";

function ProjectCtxMenu(
  props: React.PropsWithChildren<{ project: ProjectMeta }>,
) {
  const openProject = useProject((state) => state.openProject);
  const router = useRouter();
  const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(
    null,
  );
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <ContextMenu>
        <ContextMenuTrigger
          onDoubleClick={() => openProject(props.project, router)}
        >
          {props.children}
        </ContextMenuTrigger>
        <ContextMenuContent className="font-semibold">
          <DialogTrigger
            onClick={() =>
              setDialogContent(
                <EditDialog
                  {...props.project}
                  closeDialog={() => setOpen(false)}
                />,
              )
            }
            className="w-full *:w-full *:flex *:gap-2"
          >
            <ContextMenuItem>
              <Pencil width={16} />
              Edit
            </ContextMenuItem>
          </DialogTrigger>

          <ContextMenuSeparator />

          <DialogTrigger
            onClick={() =>
              setDialogContent(<ArchiveProject {...props.project} />)
            }
            className="w-full *:w-full *:flex *:gap-2 text-yellow-600"
          >
            <ContextMenuItem>
              <FileArchive size={18} />
              {props.project.archived ? "Unarchive" : "Archive"}
            </ContextMenuItem>
          </DialogTrigger>

          <DialogTrigger
            onClick={() =>
              setDialogContent(<DeleteProject {...props.project} />)
            }
            className="w-full *:w-full *:flex *:gap-2 text-red-600"
          >
            <ContextMenuItem>
              <Trash2 size={18} />
              Delete
            </ContextMenuItem>
          </DialogTrigger>
        </ContextMenuContent>
      </ContextMenu>
      <DialogContent aria-describedby={undefined}>
        {dialogContent}
      </DialogContent>
    </Dialog>
  );
}

export function ProjectCard(props: ProjectMeta) {
  return (
    <ProjectCtxMenu project={props}>
      <article className="layer-dark p-3 rounded-lg cursor-pointer select-none">
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
        </div>
      </article>
    </ProjectCtxMenu>
  );
}
