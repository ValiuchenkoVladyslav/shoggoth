import {
  Handle,
  type Node,
  type NodeProps,
  Position,
  useReactFlow,
} from "@xyflow/react";
import { Fragment } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import { newId } from "~/utils";

/** node init type */
export type NodeInit = Pick<Node, "type" | "data">;

/** hook to create a new node */
export function useNewNode(init: NodeInit) {
  const { screenToFlowPosition, addNodes } = useReactFlow();

  return (evt: React.MouseEvent) =>
    addNodes({
      id: newId(),
      position: screenToFlowPosition({ x: evt.clientX, y: evt.clientY }),
      ...init,
    });
}

// ==================================================================
const gap = 360;

/** create child nodes of given parent */
export function useCreateChildren(parent: NodeProps) {
  const { addNodes, addEdges } = useReactFlow();

  return (children: NodeInit[]) => {
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

/**
 * create node api which includes:
 * - init function for node creation
 * - node component for graph
 * - create node component for context menu
 *
 * WARNING: make sure to provide `initFn` which can
 * produce valid node data without any arguments
 */
export function createNode<
  T extends Record<string, unknown>,
  NI extends () => N["data"],
  N extends Node<T> = Node<T>,
>(props: {
  icon: JSX.Element;
  type?: string;
  graphNode: React.ComponentType<
    NodeProps<N> & {
      useReactFlow: typeof useReactFlow<N>;
    }
  >;
  initFn: NI;
}) {
  const init = (...args: Parameters<NI>) => ({
    type: props.type,
    // @ts-ignore
    data: props.initFn(...args),
  });

  return {
    init,
    createNode() {
      // @ts-ignore
      const createNode = useNewNode(init());

      return (
        <ContextMenuItem onClick={createNode} className="gap-2">
          {props.icon}
          <p>
            Add <span className="capitalize">{props.type ?? "Text"}</span> node
          </p>
        </ContextMenuItem>
      );
    },
    graphNode(_props: NodeProps<N>) {
      return <props.graphNode {..._props} useReactFlow={useReactFlow} />;
    },
  };
}

/** base node graph component */
export function BaseNode<T extends NodeProps>(
  props: React.PropsWithChildren<{
    node: T;
    className?: string;
    actions?: React.ReactNode | React.ReactNode[];
  }>,
) {
  const flow = useReactFlow();

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <ContextMenu>
        <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
        <ContextMenuContent className="font-bold">
          {Array.isArray(props.actions)
            ? props.actions.map((action, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: we don't have unique keys and we're not going to change the list
                <Fragment key={i}>{action}</Fragment>
              ))
            : props.actions}
          {props.actions && <ContextMenuSeparator />}
          <ContextMenuItem
            className="text-red-600"
            onClick={() => flow.deleteElements({ nodes: [props.node] })}
          >
            Delete Node
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}
