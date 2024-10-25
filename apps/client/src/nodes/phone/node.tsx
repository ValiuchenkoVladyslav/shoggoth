import { useReactFlow } from "@xyflow/react";
import { Phone as PhoneIcon } from "lucide-react";
import { PhoneInput } from "~/components/ui/phone-input";
import type { Phone } from "~/gen/core";
import { BaseNode, createNode } from "../utils";
import { PhoneActions, type PhoneNumber } from "./actions";

function PhoneCarrier(props: Pick<Phone, "carrier">) {
  if (!props.carrier) return null;

  return (
    <div className="py-1">
      <h3 className="font-semibold">Carrier</h3>
      <p className="cursor-auto select-text nodrag">{props.carrier}</p>
    </div>
  );
}

function PhoneLocation(props: Pick<Phone, "location">) {
  if (!props.location) return null;

  return (
    <div className="py-1">
      <h3 className="font-semibold">Location</h3>
      <p>{props.location}</p>
    </div>
  );
}

export function phoneInit(number = ""): Phone {
  return { number };
}

export const phone = createNode<PhoneNumber["data"], typeof phoneInit>({
  icon: <PhoneIcon width={17} />,
  type: "phone",
  initFn: phoneInit,
  graphNode(props) {
    const { updateNode } = useReactFlow<PhoneNumber>();
    const data = props.data;

    return (
      <BaseNode
        node={props}
        className="w-[248px]"
        actions={<PhoneActions {...props} />}
      >
        <h2 className="font-semibold flex gap-2">
          <PhoneIcon width={18} />
          PHONE NUMBER
        </h2>
        <PhoneInput
          autoComplete="disabled-auto"
          onChange={(value) => {
            updateNode(props.id, {
              ...props,
              data: { ...data, number: String(value) },
            });
          }}
          value={data.number}
        />

        <PhoneCarrier carrier={data.carrier} />

        <PhoneLocation location={data.location} />
      </BaseNode>
    );
  },
});
