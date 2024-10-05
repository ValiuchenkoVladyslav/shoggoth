import type { Node, NodeProps } from "@xyflow/react";
import { BaseNode } from "~/components/base-node";

export function TextNode(props: NodeProps<Node<{ label: string }>>) {
  return (
    <BaseNode node={props}>
      <p>lalala</p>
      {props.data.label}
    </BaseNode>
  );
}
