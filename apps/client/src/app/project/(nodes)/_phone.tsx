import { type Node, type NodeProps, useReactFlow } from "@xyflow/react";
import { BaseNode } from "~/components/base-node";
import {
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "~/components/ui/context-menu";
import { PhoneInput } from "~/components/ui/phone-input";
import type { InfogaRes } from "~/gen/InfogaRes";
import {
  useInfogaScanMutation,
  useInfogaUrlsMutation,
} from "~/tools/phone_infoga/tauri-api";
import { SearchExact } from "./_text";

type PhoneData = Partial<InfogaRes> & {
  phone?: string;
};

type PhoneNode = NodeProps<Node<PhoneData>>;

function PhoneActions(props: PhoneNode) {
  const { updateNode } = useReactFlow<Node<PhoneData>>();

  const infogaScan = useInfogaScanMutation(props.data.phone!);
  const infogaUrls = useInfogaUrlsMutation(props.data.phone!);

  if (infogaScan.isSuccess) {
    updateNode(props.id, {
      ...props,
      data: { ...props.data, ...infogaScan.data },
    });
  }

  return (
    <>
      <ContextMenuSub>
        <ContextMenuSubTrigger disabled={!props.data.phone}>
          PhoneInfoga
        </ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem onClick={() => infogaScan.mutate()}>
            Scan number
          </ContextMenuItem>
          <ContextMenuItem onClick={() => infogaUrls.mutate()}>
            Search number
          </ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>

      <SearchExact text={props.data.phone} />

      <ContextMenuItem>Extract country</ContextMenuItem>
    </>
  );
}

export function PhoneNumberNode(props: PhoneNode) {
  const { updateNode } = useReactFlow<Node<PhoneData>>();

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
            data: { ...props.data, phone: String(value) },
          });
        }}
        value={props.data.phone}
      />
    </BaseNode>
  );
}
