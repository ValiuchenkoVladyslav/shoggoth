import { newId } from "$lib/utils";
import type { Node, NodeProps } from "@xyflow/svelte";
import { edges, nodes } from "../../store";
import BaseNode from "./base-node.svelte";
import SearchText from "./search-text.svelte";

export { BaseNode, SearchText };

export type TypedNode<T extends Record<string, unknown>> = NodeProps & {
  data: T;
};

/** node init type */
export type ChildInit = Pick<Node, "type" | "data">;

const gap = 360;

/** create child nodes of given parent */
export function createChildren(parent: NodeProps, children: ChildInit[]) {
  let col = 0;
  let rowIndex = -1;

  const positionedChildren = children.map((child, index) => {
    rowIndex++;

    if (index !== 0 && index % 5 === 0) {
      col++;
      rowIndex = 0;
    }

    return {
      ...child,
      id: newId(),
      position: {
        x:
          rowIndex === 0
            ? parent.positionAbsoluteX
            : rowIndex === 1
              ? parent.positionAbsoluteX + gap
              : rowIndex === 2
                ? parent.positionAbsoluteX - gap
                : rowIndex === 3
                  ? parent.positionAbsoluteX + gap * 2
                  : parent.positionAbsoluteX - gap * 2,

        y: parent.positionAbsoluteY + col * gap + gap,
      },
    };
  });

  nodes.update((old) => old.concat(positionedChildren));

  edges.update((old) =>
    old.concat(
      positionedChildren.map((child) => ({
        id: newId(),
        source: parent.id,
        target: child.id,
      })),
    ),
  );
}
