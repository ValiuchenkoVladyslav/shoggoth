import { useReactFlow } from "@xyflow/react";
import { Phone } from "lucide-react";
import { PhoneInput } from "~/components/ui/phone-input";
import { BaseNode, createNode } from "../utils";
import { PhoneActions, type PhoneNumber, type PhoneProps } from "./actions";

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

export function phoneInit(phone?: string) {
  return { phone };
}

export const phone = createNode<PhoneNumber["data"], typeof phoneInit>({
  icon: <Phone width={17} />,
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
          <Phone width={18} />
          PHONE NUMBER
        </h2>
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
  },
});
