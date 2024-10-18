import { AtSign } from "lucide-react";
import {
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "~/components/ui/context-menu";
import { Input } from "~/components/ui/input";
import { useSherlockSearchMutation } from "~/tools/sherlock/tauri-api";
import { SearchExact } from "./text";
import { BaseNode, createNode } from "./utils";

function nicknameInit(nickname = "") {
  return { nickname };
}

export const nickname = createNode<
  {
    nickname: string;
  },
  typeof nicknameInit
>({
  type: "nickname",
  icon: <AtSign width={18} />,
  initFn: nicknameInit,
  graphNode(props) {
    const { updateNode } = props.useReactFlow();
    const sherlockSearch = useSherlockSearchMutation(props.data.nickname);

    return (
      <BaseNode
        node={props}
        className="w-[200px]"
        actions={[
          <ContextMenuSub key={0}>
            <ContextMenuSubTrigger disabled={!props.data.nickname}>
              Sherlock
            </ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem onClick={() => sherlockSearch.mutate()}>
                Search nickname
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>,

          <SearchExact key={1} text={props.data.nickname} />,
        ]}
      >
        <h2 className="font-semibold flex gap-2">
          <AtSign width={18} />
          NICKNAME
        </h2>
        <Input
          autoComplete="disabled-auto"
          defaultValue={props.data.nickname}
          onChange={(evt) => {
            updateNode(props.id, {
              ...props,
              data: { ...props.data, nickname: evt.target.value },
            });
          }}
        />
      </BaseNode>
    );
  },
});
