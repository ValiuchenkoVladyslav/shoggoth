import { Phone } from "lucide-react";
import { Chip } from "~/components/ui/chip";
import {
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "~/components/ui/context-menu";
import type { CatPhone } from "~/gen/tauri";
import { TelegramIcon } from "~/icons/telegram";
import { useSherlockSearchMutation } from "~/tools/sherlock/tauri-api";
import { BaseNode, createNode } from "./utils";

function telegramInit(data?: Partial<CatPhone>): Partial<CatPhone> {
  if (data) return data;

  return {};
}

export const telegram = createNode<Partial<CatPhone>, typeof telegramInit>({
  type: "telegram",
  icon: <TelegramIcon width={18} />,
  initFn: telegramInit,
  graphNode(props) {
    const info = props.data;
    const { updateNode } = props.useReactFlow();
    const sherlockSearch = useSherlockSearchMutation(info.username!);

    return (
      <BaseNode
        node={props}
        className="w-[260px] gap-3"
        actions={[
          <ContextMenuSub key={0}>
            <ContextMenuSubTrigger disabled={!info.username}>
              Sherlock
            </ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem onClick={() => sherlockSearch.mutate()}>
                Search username
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>,
        ]}
      >
        <h1 className="font-semibold flex gap-2">
          <TelegramIcon width={18} />
          TELEGRAM
        </h1>

        <section className="cursor-auto select-text nodrag">
          <h2 className="text-lg break-words font-semibold">
            {info.first_name}
            {info.last_name}
          </h2>

          {info.username && (
            <p className="font-semibold text-blue-500">@{info.username}</p>
          )}
          {info.usernames?.map((username) => (
            <p key={username} className="font-semibold text-blue-500">
              @{username}
            </p>
          ))}

          {info.id && (
            <p className="font-medium">
              ID: <code>{info.id}</code>
            </p>
          )}
        </section>

        {info.phone && (
          <div className="flex gap-2 cursor-auto select-text nodrag">
            <Phone width={18} />
            {info.phone}
          </div>
        )}

        {(info.bot || info.verified || info.premium || info.fake) && (
          <section className="flex flex-wrap gap-1">
            {info.bot && <Chip>bot</Chip>}
            {info.verified && (
              <Chip className="bg-green-600 text-white">verified</Chip>
            )}
            {info.premium && (
              <Chip className="bg-pink-600 text-white">premium</Chip>
            )}
            {info.fake && <Chip className="bg-red-600 text-white">scam</Chip>}
          </section>
        )}
      </BaseNode>
    );
  },
});
