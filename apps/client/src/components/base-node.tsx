import { Handle, type NodeProps, Position } from "@xyflow/react";
import { useReactFlow } from "@xyflow/react";
import { cn } from "~/utils";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";

export type BaseNodeProps<T extends NodeProps> = {
  node: T;
  className?: string;
  actions?: React.ReactNode;
};

export function NodeContextMenu<T extends NodeProps>(
  props: React.PropsWithChildren<Omit<BaseNodeProps<T>, "className">>,
) {
  const flow = useReactFlow();

  return (
    <ContextMenu>
      <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
      <ContextMenuContent className="font-bold">
        {props.actions}
        <ContextMenuSeparator />
        <ContextMenuItem
          className="text-red-600"
          onClick={() => flow.deleteElements({ nodes: [props.node] })}
        >
          Delete Node
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export function BaseNode<T extends NodeProps>(
  props: React.PropsWithChildren<BaseNodeProps<T>>,
) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <NodeContextMenu node={props.node} actions={props.actions}>
        <article
          className={cn(
            "flex flex-col items-start gap-2 min-w-52 p-3 rounded-lg text-left layer-dark *:w-full",
            props.className,
          )}
        >
          {props.children}
        </article>
      </NodeContextMenu>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}
