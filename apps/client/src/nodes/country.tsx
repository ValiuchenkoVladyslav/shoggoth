import type { Node, NodeProps } from "@xyflow/react";
import { BaseNode } from "~/components/base-node";
import { ContextMenuItem } from "~/components/ui/context-menu";
import { useNewNode } from "~/utils";

type Country = Node<{
  country?: string;
}>;
type ContryProps = NodeProps<Country>;

export function CountryNode(props: ContryProps) {
  return (
    <BaseNode
      node={props}
      className="rounded-full p-0 min-w-[160px] aspect-square fib fi-ua fis items-center"
    >
      <h3 className="layer-dark rounded-lg !w-fit text-center font-semibold py-1 px-2">
        Ukraine
      </h3>
    </BaseNode>
  );
}

export function CreateCountryNode() {
  const createNode = useNewNode("country");

  return (
    <ContextMenuItem onClick={createNode}>Add Country node</ContextMenuItem>
  );
}
