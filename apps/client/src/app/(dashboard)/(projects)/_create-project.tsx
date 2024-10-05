import { DialogDescription } from "@radix-ui/react-dialog";
import { SquarePlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogCancel,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import type { ProjectBase } from "~/gen/ProjectBase";
import { useCreateProjectMutation } from "~/tauri-api/projects";

export function CreateProject() {
  const [isOpen, setIsOpen] = useState(false);
  const createProject = useCreateProjectMutation();
  const { register, handleSubmit } = useForm<ProjectBase>();

  function onSubmit(data: ProjectBase) {
    createProject.mutate(data);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 font-bold">
          <SquarePlus />
          NEW PROJECT
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new project</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <section>
            <label htmlFor="prj-name">Project name</label>
            <Input
              id="prj-name"
              defaultValue="New project"
              placeholder="Project name"
              {...register("name", { required: true })}
            />

            <label htmlFor="prj-desc" className="mt-3 block">
              Project description
            </label>
            <Textarea
              id="prj-desc"
              placeholder="Describe your project here..."
              {...register("desc", { required: true })}
            />
          </section>

          <section className="mt-6 flex gap-2">
            <Button type="submit">
              <SquarePlus size={22} />
              Create
            </Button>

            <DialogCancel />
          </section>
        </form>
      </DialogContent>
    </Dialog>
  );
}
