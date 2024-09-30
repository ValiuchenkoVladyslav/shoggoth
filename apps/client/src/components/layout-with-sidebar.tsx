"use client";

import { GripVertical } from "lucide-react";
import {
  type ImperativePanelHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

const sidebarDefaultSize = 13;

let panelRef: ImperativePanelHandle | null = null;

if (typeof window !== "undefined") {
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && (e.key === "s" || e.key === "ы")) {
      e.preventDefault();

      if (!panelRef?.getSize()) {
        panelRef?.expand();
      } else {
        panelRef?.collapse();
      }
    }
  });
}

export function Resizable({
  sidebar,
  children,
}: React.PropsWithChildren<{ sidebar: React.ReactNode }>) {
  return (
    <PanelGroup autoSaveId="layout-props" direction="horizontal">
      <Panel
        ref={(ref) => {
          panelRef = ref;
        }}
        defaultSize={sidebarDefaultSize}
        minSize={sidebarDefaultSize}
        maxSize={sidebarDefaultSize * 3}
        collapsible
        className="px-3 pb-3 h-[calc(100vh-36px)]"
        data-sidebar
        onResize={(size, prevSize) => {
          if (!size) {
            document.querySelector("[data-sidebar]")?.classList.remove("px-3");
          } else if (!prevSize) {
            document.querySelector("[data-sidebar]")?.classList.add("px-3");
          }
        }}
      >
        {sidebar}
      </Panel>

      <PanelResizeHandle className="w-[1px] flex items-center">
        <div className="bg-gray-800 rounded-lg translate-x-[-6px]">
          <GripVertical width={12} />
        </div>
      </PanelResizeHandle>

      <Panel
        className="layer-light rounded-tl-md h-[calc(100vh-36px)]"
        defaultSize={100 - sidebarDefaultSize}
      >
        {children}
      </Panel>
    </PanelGroup>
  );
}
