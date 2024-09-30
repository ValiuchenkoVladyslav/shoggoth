import { FileQuestion, Settings, Users, Wrench } from "lucide-react";
import { Resizable } from "~/components/layout-with-sidebar";
import { NavLink } from "~/components/nav-link";

function SidebarLink(
  props: Omit<React.ComponentProps<typeof NavLink>, "className">,
) {
  return (
    <NavLink
      className="hover:bg-white/10 p-2 rounded-lg aria-[current=page]:bg-white/10 flex gap-2"
      {...props}
    />
  );
}

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <Resizable
      sidebar={
        <nav className="h-full flex flex-col justify-between font-medium">
          <div className="flex flex-col gap-2">
            <SidebarLink href="/">
              <FileQuestion />
              PROJECTS
            </SidebarLink>
            <SidebarLink href="/tools">
              <Wrench />
              TOOLS
            </SidebarLink>
            <SidebarLink href="/teams">
              <Users />
              TEAMS
            </SidebarLink>
          </div>

          <SidebarLink href="/settings">
            <Settings />
            SETTINGS
          </SidebarLink>
        </nav>
      }
    >
      <div className="h-full p-3 pr-1 overflow-y-scroll">{children}</div>
    </Resizable>
  );
}
