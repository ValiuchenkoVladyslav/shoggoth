"use client";

import { ReactFlowProvider } from "@xyflow/react";
import { Resizable } from "~/components/layout-with-sidebar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import { useProject } from "~/projects/store";
import { CreateNicknameNode } from "./(nodes)/_nickname";
import { CreatePhoneNode } from "./(nodes)/_phone";
import { CreateTextNode } from "./(nodes)/_text";

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
          <ContextMenuContent>
            <CreateTextNode />
            <CreatePhoneNode />
            <CreateNicknameNode />
          </ContextMenuContent>
        </ContextMenu>
      </Resizable>
    </ReactFlowProvider>
  );
}
