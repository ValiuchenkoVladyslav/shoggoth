"use client";

import { ReactFlowProvider } from "@xyflow/react";
import { Resizable } from "~/components/layout-with-sidebar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import { country } from "~/nodes/country";
import { nickname } from "~/nodes/nickname";
import { phone } from "~/nodes/phone/node";
import { telegram } from "~/nodes/telegram";
import { text } from "~/nodes/text";
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
            <text.createNode />
            <phone.createNode />
            <nickname.createNode />
            <country.createNode />
            <telegram.createNode />
          </ContextMenuContent>
        </ContextMenu>
      </Resizable>
    </ReactFlowProvider>
  );
}
