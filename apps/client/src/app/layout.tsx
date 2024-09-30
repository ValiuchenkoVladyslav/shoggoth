import { NavLink } from "~/components/nav-link";
import { ProjectTab } from "./_project-tab";
import { QueryClientProvider } from "./_query-client";
import WindowButtons from "./_window-buttons";

import "./globals.css";
import "@xyflow/react/dist/style.css";

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className="layer-dark fixed w-screen h-screen">
        <QueryClientProvider>
          <header
            className="flex items-center justify-between h-9 pl-3"
            data-tauri-drag-region
          >
            <section className="flex gap-3 text-lg font-semibold *:opacity-60 hover:*:opacity-100 aria-[current=page]:*:opacity-100">
              <NavLink href="/" aliases={["/settings", "/teams", "/tools"]}>
                shoggoth
              </NavLink>

              <ProjectTab />
            </section>

            <menu className="flex *:grid *:place-content-center *:w-10 *:h-9">
              <WindowButtons />
            </menu>
          </header>

          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
