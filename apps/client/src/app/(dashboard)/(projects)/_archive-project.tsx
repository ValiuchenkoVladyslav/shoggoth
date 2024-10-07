import { FileArchive } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DialogCancel,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import type { ProjectMeta } from "~/gen/ProjectMeta";
import { useEditProjectMetaMutation } from "~/projects/tauri-api";

export function ArchiveProject(props: ProjectMeta) {
  const editProjectMeta = useEditProjectMetaMutation();

  const archiveText = props.archived ? "Unarchive" : "Archive";

  return (
    <>
      <DialogHeader>
        <DialogTitle>{archiveText} Project?</DialogTitle>
      </DialogHeader>

      <section className="pt-6 flex gap-2">
        <DialogClose asChild>
          <Button
            className="bg-yellow-600 text-white"
            onClick={() =>
              editProjectMeta.mutate({ ...props, archived: !props.archived })
            }
          >
            <FileArchive size={18} />
            {archiveText}
          </Button>
        </DialogClose>

        <DialogCancel />
      </section>
    </>
  );
}
