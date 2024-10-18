import dynamic from "next/dynamic";
import { Slide, ToastContainer } from "react-toastify";
import { NavLink } from "~/components/links";
import { CatOtpRequest } from "~/tools/bellingcat_tg/cat-otp-request";
import { ProjectTab } from "./_project-tab";
import { ReactQueryProvider } from "./_query-client";
import { WindowButtons } from "./_window-buttons";

import "./globals.css";

const ClientInit = dynamic(() => import("./_client-init"), { ssr: false });

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className="layer-dark fixed w-screen h-screen">
        <ReactQueryProvider>
          <ClientInit />

          <header
            className="flex items-center justify-between pl-3"
            data-tauri-drag-region
          >
            <section className="flex gap-3 text-lg font-semibold">
              <NavLink
                href="/"
                aliases={["/settings", "/teams", "/tools"]}
                scroll={false}
                className="opacity-60 hover:opacity-100 aria-[current=page]:opacity-100"
              >
                shoggoth
              </NavLink>

              <ProjectTab />
            </section>

            <menu className="flex *:grid *:place-content-center *:w-10 *:h-8">
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

        <CatOtpRequest />
      </body>
    </html>
  );
}
