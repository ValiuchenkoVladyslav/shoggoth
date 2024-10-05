"use client";

import { ReactFlowProvider } from "@xyflow/react";
import { Resizable } from "~/components/layout-with-sidebar";
import { Sidebar } from "./_sidebar";

export default function Layout(props: React.PropsWithChildren) {
  return (
    <ReactFlowProvider>
      <Resizable sidebar={<Sidebar />} {...props} />
    </ReactFlowProvider>
  );
}
