import type { Node, NodeProps } from "@xyflow/react";
import { Flag } from "lucide-react";
import { BaseNode } from "~/components/base-node";
import { ContextMenuItem } from "~/components/ui/context-menu";
import { cn } from "~/utils";
import { useNewNode } from "./utils";

type Country = Node<{
  country?: string;
}>;
type ContryProps = NodeProps<Country>;

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

export function CountryNode(props: ContryProps) {
  const country = props.data.country;

  let countryFull = country;
  try {
    countryFull = regionNames.of(country!);
  } catch (e) {}

  return (
    <BaseNode
      node={props}
      className={cn(
        "rounded-full p-0 min-w-[160px] aspect-square fib fis items-center",
        "fi-" + country?.toLocaleLowerCase(),
      )}
    >
      <h3 className="layer-dark rounded-lg !w-fit text-center font-semibold py-1 px-2">
        {countryFull}
      </h3>
    </BaseNode>
  );
}

export function CreateCountryNode() {
  const createNode = useNewNode("country");

  return (
    <ContextMenuItem onClick={createNode} className="gap-2">
      <Flag width={17} />
      Add Country node
    </ContextMenuItem>
  );
}
