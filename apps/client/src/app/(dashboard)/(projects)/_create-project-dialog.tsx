"use client";

import { CircleOff, SquarePlus } from "lucide-react";
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
import type { ProjectBase } from "~/gen/ProjectBase";
import { useCreateProjectMutation } from "~/tauri-api/projects";

export function CreateProjectDialog() {
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
      <DialogContent aria-describedby={undefined}>
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
            <Button type="submit" size="sm">
              <SquarePlus />
              Create
            </Button>

            <DialogClose asChild>
              <Button size="sm" variant="ghost">
                <CircleOff size={18} />
                Cancel
              </Button>
            </DialogClose>
          </section>
        </form>
      </DialogContent>
    </Dialog>
  );
}
