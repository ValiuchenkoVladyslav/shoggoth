import { useReactFlow } from "@xyflow/react";
import { BaseNode } from "~/components/base-node";
import { ContextMenuItem } from "~/components/ui/context-menu";
import { PhoneInput } from "~/components/ui/phone-input";
import { useNewNode } from "../utils";
import { PhoneActions } from "./actions";
import type { PhoneNumber, PhoneProps } from "./types";

function PhoneCarrier(props: Pick<PhoneProps["data"], "carrier">) {
  if (!props.carrier) return null;

  return (
    <div className="py-1">
      <h3 className="font-semibold">Carrier</h3>
      <p>{props.carrier}</p>
    </div>
  );
}

function PhoneLocation(props: Pick<PhoneProps["data"], "location">) {
  if (!props.location) return null;

  return (
    <div className="py-1">
      <h3 className="font-semibold">Location</h3>
      <p>{props.location}</p>
    </div>
  );
}

export function PhoneNumberNode(props: PhoneProps) {
  const { updateNode } = useReactFlow<PhoneNumber>();
  const data = props.data;

  return (
    <BaseNode
      node={props}
      className="w-[320px]"
      actions={<PhoneActions {...props} />}
    >
      <h2 className="font-semibold">PHONE NUMBER</h2>
      <PhoneInput
        autoComplete="disabled-auto"
        onChange={(value) => {
          updateNode(props.id, {
            ...props,
            data: { ...data, phone: String(value) },
          });
        }}
        value={data.phone}
      />

      <PhoneCarrier carrier={data.carrier} />

      <PhoneLocation location={data.location} />
    </BaseNode>
  );
}

export function CreatePhoneNode() {
  const createNode = useNewNode("phone");

  return <ContextMenuItem onClick={createNode}>Add Phone Node</ContextMenuItem>;
}
