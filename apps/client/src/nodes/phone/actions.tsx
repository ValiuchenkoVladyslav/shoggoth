import { useReactFlow } from "@xyflow/react";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";
import {
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "~/components/ui/context-menu";
import {
  useInfogaScanMutation,
  useInfogaUrlsMutation,
} from "~/tools/phone_infoga/tauri-api";
import { SearchExact } from "../text";
import { useCreateChildren } from "../utils";
import type { PhoneNumber, PhoneProps } from "./types";

export function PhoneActions(props: PhoneProps) {
  const { updateNode } = useReactFlow<PhoneNumber>();
  const createChildren = useCreateChildren(props);

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
            {
              type: "country",
              data: {
                country: parsePhoneNumber(props.data.phone!)?.country,
              },
            },
          ]);
        }}
      >
        Extract country
      </ContextMenuItem>
    </>
  );
}
