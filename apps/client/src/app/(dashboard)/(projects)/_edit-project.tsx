import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  DialogCancel,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import type { ProjectMeta } from "~/gen/ProjectMeta";
import { useEditProjectMetaMutation } from "~/projects/tauri-api";

type EditInputs = Pick<ProjectMeta, "name" | "desc">;

export function EditDialog(props: ProjectMeta & { closeDialog: () => void }) {
  const editProjectMeta = useEditProjectMetaMutation();
  const { register, handleSubmit } = useForm<EditInputs>();

  function onSubmit(data: EditInputs) {
    editProjectMeta.mutate({ ...props, ...data });
    props.closeDialog();
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit project</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="proj-name">Project name</label>
        <Input
          id="proj-name"
          defaultValue={props.name}
          {...register("name", { required: true })}
        />

        <label htmlFor="proj-desc" className="mt-3 block">
          Project description
        </label>
        <Textarea
          id="proj-desc"
          defaultValue={props.desc}
          {...register("desc", { required: true })}
        />

        <section className="mt-6 flex gap-2">
          <Button type="submit">
            <Save size={18} />
            Save
          </Button>

          <DialogCancel />
        </section>
      </form>
    </>
  );
}
