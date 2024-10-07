import { Slide, ToastContainer } from "react-toastify";
import { NavLink } from "~/components/links";
import { AppInit } from "./_app-init";
import { ProjectTab } from "./_project-tab";
import { ReactQueryProvider } from "./_query-client";
import { WindowButtons } from "./_window-buttons";

import "./globals.css";

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className="layer-dark fixed w-screen h-screen">
        <ReactQueryProvider>
          <AppInit />

          <header
            className="flex items-center justify-between h-9 pl-3"
            data-tauri-drag-region
          >
            <section className="flex gap-3 text-lg font-semibold">
              <NavLink
                href="/"
                aliases={["/settings", "/teams", "/tools"]}
                className="opacity-60 hover:opacity-100 aria-[current=page]:opacity-100"
              >
                shoggoth
              </NavLink>

              <ProjectTab />
            </section>

            <menu className="flex *:grid *:place-content-center *:w-10 *:h-9">
              <WindowButtons />
            </menu>
          </header>

          {children}
        </ReactQueryProvider>

        <ToastContainer
          position="bottom-right"
          autoClose={6000}
          theme="dark"
          transition={Slide}
          closeButton={false}
        />
      </body>
    </html>
  );
}
