import { Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DialogCancel,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import type { ProjectMeta } from "~/gen/ProjectMeta";
import { useDeleteProjectMutation } from "~/projects/tauri-api";

export function DeleteProject(props: Pick<ProjectMeta, "id">) {
  const deleteProject = useDeleteProjectMutation();

  return (
    <>
      <DialogHeader>
        <DialogTitle>Delete Project?</DialogTitle>
        <DialogDescription>
          Better consider archiving it for future references
        </DialogDescription>

        <section className="pt-6 flex gap-2">
          <Button
            variant="destructive"
            onClick={() => deleteProject.mutate(props.id)}
          >
            <Trash2 size={18} />
            Delete
          </Button>

          <DialogCancel />
        </section>
      </DialogHeader>
    </>
  );
}
