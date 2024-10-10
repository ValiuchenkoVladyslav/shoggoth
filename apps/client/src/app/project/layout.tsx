"use client";

import { ReactFlowProvider } from "@xyflow/react";
import { Resizable } from "~/components/layout-with-sidebar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import { CreateCountryNode } from "~/nodes/country";
import { CreateNicknameNode } from "~/nodes/nickname";
import { CreatePhoneNode } from "~/nodes/phone/node";
import { CreateTextNode } from "~/nodes/text";
import { useProject } from "~/projects/store";

export default function Layout(props: React.PropsWithChildren) {
  const project = useProject((state) => state.project);

  return (
    <ReactFlowProvider>
      <Resizable
        sidebar={
          <aside>
            <p className="opacity-70">{project?.desc}</p>
          </aside>
        }
      >
        <ContextMenu>
          <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
          <ContextMenuContent className="font-bold">
            <CreateTextNode />
            <CreatePhoneNode />
            <CreateNicknameNode />
            <CreateCountryNode />
          </ContextMenuContent>
        </ContextMenu>
      </Resizable>
    </ReactFlowProvider>
  );
}
