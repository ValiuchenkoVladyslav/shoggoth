import { Flag } from "lucide-react";
import type { Country } from "~/gen/core";
import { cn } from "~/utils";
import { BaseNode, createNode } from "./utils";

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

function countryInit(name = "") {
  return { name };
}

export const country = createNode<Country, typeof countryInit>({
  type: "country",
  icon: <Flag width={17} />,
  initFn: countryInit,
  graphNode(props) {
    const country = props.data.name;

    let countryFull = country;
    try {
      countryFull = regionNames.of(country!) ?? "";
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
  },
});
