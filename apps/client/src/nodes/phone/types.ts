import type { Node, NodeProps } from "@xyflow/react";
import type { InfogaRes } from "~/gen/tauri";

export type PhoneNumber = Node<
  Partial<InfogaRes> & {
    phone?: string;
  }
>;
export type PhoneProps = NodeProps<PhoneNumber>;
