"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export enum ProjectFilter {
  All = "all",
  Archived = "archived",
  Active = "active",
}

export function ProjectFilterSelect(props: {
  filter: ProjectFilter;
  setFilter: (filter: ProjectFilter) => void;
}) {
  return (
    <Select onValueChange={props.setFilter} defaultValue={props.filter}>
      <SelectTrigger className="!w-[160px] layer-light font-semibold">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-black">
        {Object.keys(ProjectFilter).map((filter) => (
          <SelectItem key={filter} value={filter.toLowerCase()}>
            {filter}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
