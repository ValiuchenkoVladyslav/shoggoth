import { type Node, type NodeProps, useReactFlow } from "@xyflow/react";
import { BaseNode } from "~/components/base-node";
import {
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "~/components/ui/context-menu";
import { Input } from "~/components/ui/input";
import { useSherlockSearchMutation } from "~/tools/sherlock/tauri-api";
import { useNewNode } from "~/utils";
import { SearchExact } from "./_text";

type TNicknameNode = Node<{
  nickname?: string;
}>;
type NicknameNodeProps = NodeProps<TNicknameNode>;

function NicknameActions(props: NicknameNodeProps) {
  const sherlockSearch = useSherlockSearchMutation(props.data.nickname!);

  return (
    <>
      <ContextMenuSub>
        <ContextMenuSubTrigger disabled={!props.data.nickname}>
          Sherlock
        </ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem onClick={() => sherlockSearch.mutate()}>
            Search nickname
          </ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>

      <SearchExact text={props.data.nickname} />
    </>
  );
}

export function NicknameNode(props: NicknameNodeProps) {
  const { updateNode } = useReactFlow<TNicknameNode>();

  return (
    <BaseNode
      node={props}
      className="w-[320px]"
      actions={<NicknameActions {...props} />}
    >
      <h2 className="font-semibold">NICKNAME</h2>
      <Input
        autoComplete="disabled-auto"
        defaultValue={props.data.nickname}
        onChange={(event) => {
          updateNode(props.id, {
            ...props,
            data: { ...props.data, nickname: event.target.value },
          });
        }}
      />
    </BaseNode>
  );
}

export function CreateNicknameNode() {
  const createNode = useNewNode("nickname");

  return (
    <ContextMenuItem onClick={createNode}>Add Nickname node</ContextMenuItem>
  );
}
