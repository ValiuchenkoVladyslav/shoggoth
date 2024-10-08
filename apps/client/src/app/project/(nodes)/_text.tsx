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
import { useNewNode } from "~/utils";

type TTextNode = Node<{ text?: string }>;
type TextNodeProps = NodeProps<TTextNode>;

export function SearchExact({ text }: TTextNode["data"]) {
  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger disabled={!text}>
        Search exact text
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

export function TextNode(props: TextNodeProps) {
  const { updateNode } = useReactFlow<TTextNode>();

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

export function CreateTextNode() {
  const createNode = useNewNode();

  return <ContextMenuItem onClick={createNode}>Add Text Node</ContextMenuItem>;
}
