import { type Node, type NodeProps, useReactFlow } from "@xyflow/react";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";
import {
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "~/components/ui/context-menu";
import type { InfogaRes } from "~/gen/tauri";
import { useCatTgCheckMutation } from "~/tools/bellingcat_tg/tauri-api";
import {
  useInfogaScanMutation,
  useInfogaUrlsMutation,
} from "~/tools/phone_infoga/tauri-api";
import { country } from "../country";
import { telegram } from "../telegram";
import { SearchExact } from "../text";
import { useCreateChildren } from "../utils";

export type PhoneNumber = Node<
  Partial<InfogaRes> & {
    phone?: string;
  }
>;
export type PhoneProps = NodeProps<PhoneNumber>;

export function PhoneActions(props: PhoneProps) {
  const { updateNode } = useReactFlow<PhoneNumber>();
  const createChildren = useCreateChildren(props);

  const cattg = useCatTgCheckMutation(props.data.phone!, (data) => {
    createChildren([telegram.init(data)]);
  });

  const infogaScan = useInfogaScanMutation(props.data.phone!, (data) => {
    updateNode(props.id, {
      ...props,
      height: undefined, // to force height recalculation
      data: { ...props.data, ...data },
    });
  });

  const infogaUrls = useInfogaUrlsMutation(props.data.phone!);

  const isPhoneValid = isValidPhoneNumber(props.data.phone ?? "");

  return (
    <>
      <ContextMenuSub>
        <ContextMenuSubTrigger disabled={!isPhoneValid}>
          BellingCat TG
        </ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem onClick={() => cattg.mutate()}>
            Check number in telegram
          </ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuSub>
        <ContextMenuSubTrigger disabled={!isPhoneValid}>
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

      <ContextMenuSub>
        <ContextMenuSubTrigger disabled={!isPhoneValid}>
          Text
        </ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <SearchExact text={props.data.phone} />
        </ContextMenuSubContent>
      </ContextMenuSub>

      <ContextMenuItem
        disabled={!isPhoneValid}
        onClick={() => {
          createChildren([
            country.init(parsePhoneNumber(props.data.phone!)?.country),
          ]);
        }}
      >
        Extract country
      </ContextMenuItem>
    </>
  );
}
