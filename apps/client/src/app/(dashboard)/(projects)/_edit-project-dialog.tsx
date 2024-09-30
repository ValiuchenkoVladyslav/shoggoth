"use client";

import { CircleOff, Pencil, Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import type { ProjectMeta } from "~/gen/ProjectMeta";
import { useEditProjectMetaMutation } from "~/tauri-api/projects";
import { ArchiveProjectButton } from "./_archive-project-button";
import { DeleteProjectButton } from "./_delete-project-button";

type EditInputs = Pick<ProjectMeta, "name" | "desc">;

export function EditProjectDialog(props: ProjectMeta) {
  const editProjectMeta = useEditProjectMetaMutation();

  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit } = useForm<EditInputs>();

  function onSubmit(data: EditInputs) {
    editProjectMeta.mutate({ ...props, ...data });
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="h-[32px]" size="sm" variant="secondary">
          <Pencil width={16} />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Edit project</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <section>
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
          </section>

          <section className="mt-6 flex justify-between">
            <div className="flex gap-2">
              <Button type="submit" size="sm">
                <Save size={18} />
                Save
              </Button>

              <DialogClose asChild>
                <Button size="sm" variant="ghost">
                  <CircleOff size={18} />
                  Cancel
                </Button>
              </DialogClose>
            </div>

            <div className="flex gap-2">
              <ArchiveProjectButton
                {...props}
                closeEditDialog={() => setIsOpen(false)}
              />
              <DeleteProjectButton id={props.id} />
            </div>
          </section>
        </form>
      </DialogContent>
    </Dialog>
  );
}
