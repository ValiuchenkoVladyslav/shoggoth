"use client";

import { listen } from "@tauri-apps/api/event";
import { ReactFlowProvider } from "@xyflow/react";
import { useEffect } from "react";
import { Resizable } from "~/components/layout-with-sidebar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import type { TmpNode } from "~/gen/tauri";
import { country } from "~/nodes/country";
import { nickname } from "~/nodes/nickname";
import { phone } from "~/nodes/phone/node";
import { telegram } from "~/nodes/telegram";
import { text } from "~/nodes/text";
import { url } from "~/nodes/url";
import { useTmpNodes } from "./_use-tmp-nodes";

function ProjectSidebar() {
  const { tmpNodes, addTmpNode } = useTmpNodes();

  useEffect(() => {
    function handleNode(evt: { payload: TmpNode }) {
      addTmpNode(evt.payload);
    }

    const urlUnsub = listen("add-url", handleNode);
    const nickUnsub = listen("add-nickname", handleNode);
    const textUnsub = listen("add-text", handleNode);

    return () => {
      (async () => {
        (await urlUnsub)();
        (await nickUnsub)();
        (await textUnsub)();
      })();
    };
  }, [addTmpNode]);

  return (
    <aside className="flexcol gap-2">
      <section>
        <h2 className="font-bold text-lg">Incoming Nodes</h2>

        <ul className="flexcol gap-2">
          {tmpNodes.map((node) => (
            <li
              key={node.id}
              draggable
              className="py-2 px-3 rounded-lg bg-gray-900 cursor-grab"
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("text/plain", JSON.stringify(node));
              }}
            >
              <h3 className="text-lg font-semibold uppercase">{node.type}</h3>
              <ul>
                {Object.entries(JSON.parse(node.data)).map(([key, value]) => (
                  <li key={key} className="break-words">
                    {key}: {String(value)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}

export default function Layout(props: React.PropsWithChildren) {
  return (
    <ReactFlowProvider>
      <Resizable sidebar={<ProjectSidebar />}>
        <ContextMenu>
          <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
          <ContextMenuContent className="font-bold">
            <text.createNode />
            <phone.createNode />
            <nickname.createNode />
            <country.createNode />
            <telegram.createNode />
            <url.createNode />
          </ContextMenuContent>
        </ContextMenu>
      </Resizable>
    </ReactFlowProvider>
  );
}
