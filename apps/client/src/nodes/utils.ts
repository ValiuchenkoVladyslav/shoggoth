import { type Node, type NodeProps, useReactFlow } from "@xyflow/react";
import { newId } from "~/utils";

/** hook to create a new node */
export function useNewNode(type?: string) {
  const { screenToFlowPosition, addNodes } = useReactFlow();

  return (evt: React.MouseEvent) =>
    addNodes({
      id: newId(),
      position: screenToFlowPosition({ x: evt.clientX, y: evt.clientY }),
      data: {},
      type,
    });
}

/* create child nodes */
const gap = 360;

export function useCreateChildren(parent: NodeProps) {
  const { addNodes, addEdges } = useReactFlow();

  return (children: Pick<Node, "type" | "data">[]) => {
    let col = 0;
    let rowIndex = 0;

    const positionedChildren = children.map((child, index) => {
      if (index !== 0 && index % 5 === 0) {
        col++;
        rowIndex = 0;
      }

      const x =
        rowIndex === 0
          ? parent.positionAbsoluteX
          : rowIndex === 1
            ? parent.positionAbsoluteX + gap
            : rowIndex === 2
              ? parent.positionAbsoluteX - gap
              : rowIndex === 3
                ? parent.positionAbsoluteX + gap * 2
                : parent.positionAbsoluteX - gap * 2;

      rowIndex++;

      const y = parent.positionAbsoluteY + col * gap + gap;

      return {
        ...child,
        id: newId(),
        position: { x, y },
      };
    });

    addNodes(positionedChildren);

    addEdges(
      positionedChildren.map((child) => ({
        id: newId(),
        source: parent.id,
        target: child.id,
      })),
    );
  };
}
