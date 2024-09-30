import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";

export function ProjectsSearch() {
  return (
    <Input
      className="layer-light text-lg"
      placeholder="Search projects"
      endIcon={Search}
    />
  );
}
