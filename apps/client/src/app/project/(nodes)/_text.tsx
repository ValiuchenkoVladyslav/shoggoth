import { type Node, type NodeProps, useReactFlow } from "@xyflow/react";
import { BaseNode } from "~/components/base-node";
import {
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "~/components/ui/context-menu";
import { Textarea } from "~/components/ui/textarea";

export function SearchExact({ text }: { text?: string }) {
  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger disabled={!text}>
        Search exact
      </ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuItem>Google</ContextMenuItem>
        <ContextMenuItem>DuckDuckGo</ContextMenuItem>
        <ContextMenuItem>Yandex</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>All</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
  );
}

export function TextNode(props: NodeProps<Node<{ text: string }>>) {
  const { updateNode } = useReactFlow<Node<{ text: string }>>();

  return (
    <BaseNode
      node={props}
      className="w-[340px]"
      actions={<SearchExact text={props.data.text} />}
    >
      <h2 className="font-semibold text-base">TEXT</h2>
      <Textarea
        defaultValue={props.data.text}
        className="h-[7lh] resize-none"
        onChange={(e) => {
          updateNode(props.id, {
            ...props,
            data: { ...props.data, text: e.target.value },
          });
        }}
      />
    </BaseNode>
  );
}
