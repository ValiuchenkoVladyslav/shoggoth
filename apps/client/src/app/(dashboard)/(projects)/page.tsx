"use client";

import { useState } from "react";
import { useProjectsQuery } from "~/projects/tauri-api";
import { CreateProject } from "./_create-project";
import { ProjectCard } from "./_project-card";
import { ProjectFilter, ProjectFilterSelect } from "./_project-filter-select";
import { ProjectsSearch } from "./_projects-search";

export default function ProjectsPage() {
  const [projectFilter, setProjectFilter] = useState(ProjectFilter.All);
  const projects = useProjectsQuery();

  if (projects.isError) {
    console.log(projects.error);
  }

  const filteredProjects = projects.data
    ?.filter((project) => {
      if (projectFilter === ProjectFilter.Archived) return project.archived;

      if (projectFilter === ProjectFilter.Active) return !project.archived;

      // ProjectFilter.All
      return true;
    })
    .sort((a, b) => {
      if (a.archived !== b.archived) return a.archived ? 1 : -1;
      return Number(b.created_at - a.created_at);
    });

  return (
    <>
      <section className="sticky left-0 top-0 bg-black p-3 rounded-lg flex justify-between gap-3 z-[5] border border-2">
        <CreateProject />

        <ProjectsSearch />
        <ProjectFilterSelect
          filter={projectFilter}
          setFilter={setProjectFilter}
        />
      </section>

      <section className="grid gap-3 pt-3 grid-cols-2 xl:grid-cols-3">
        {filteredProjects?.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </section>
    </>
  );
}
