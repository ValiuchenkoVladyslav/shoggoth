import type { Node, NodeProps } from "@xyflow/react";
import { useReducer } from "react";
import { parsePhoneNumber } from "react-phone-number-input";
import { BaseNode, type NodeCtxMenuAction } from "~/components/base-node";
import { PhoneInput } from "~/components/ui/phone-input";

type PhoneNode = NodeProps<
  Node<{
    label: string;
    phone?: string;
  }>
>;

const phoneActions: NodeCtxMenuAction<PhoneNode>[] = [
  [
    "PhoneInfoga scan",
    (node) => {
      console.log("Phone info", node.data.phone);
    },
  ],
];

export function PhoneNumberNode(props: PhoneNode) {
  const [numberData, setNumberData] = useReducer(
    (_: unknown, action: string) => {
      props.data.phone = action;

      return parsePhoneNumber(action);
    },
    parsePhoneNumber(props.data.phone ?? ""),
  );

  return (
    <BaseNode node={props} actions={phoneActions} className="w-[240px]">
      <h2 className="font-semibold">PHONE NUMBER</h2>
      <PhoneInput onChange={setNumberData} value={props.data.phone} />
      <div>
        <span className="font-semibold">Country:</span> {numberData?.country}
      </div>
    </BaseNode>
  );
}
