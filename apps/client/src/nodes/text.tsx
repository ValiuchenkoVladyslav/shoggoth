import { Text as TextIcon } from "lucide-react";
import { useRef } from "react";
import {
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "~/components/ui/context-menu";
import { Textarea } from "~/components/ui/textarea";
import { DDGIcon } from "~/icons/ddg";
import { GoogleIcon } from "~/icons/google";
import { YandexIcon } from "~/icons/yandex";
import { browse } from "~/utils";
import { BaseNode, createNode } from "./utils";

type Text = { text?: string };

const googleSearch = "https://www.google.com/search?q=";
const ddgSearch = "https://duckduckgo.com/?q=";
const yandexSearch = "https://yandex.com/search/?text=";

export function SearchExact({ text }: Text) {
  const searchUrl = (pref: string) => encodeURI(pref + text);
  const searchExactUrl = (pref: string) => encodeURI(pref + `"${text}"`);

  return (
    <>
      <ContextMenuSub>
        <ContextMenuSubTrigger
          disabled={!text}
          className="cursor-pointer"
          onClick={() => {
            browse(searchExactUrl(googleSearch));
            browse(searchExactUrl(ddgSearch));
            browse(searchExactUrl(yandexSearch));
          }}
        >
          Search exact text
        </ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuLabel>Engine (default: all)</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuItem
            onClick={() => browse(searchExactUrl(googleSearch))}
            className="gap-1"
          >
            <GoogleIcon className="w-5" />
            Google
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => browse(searchExactUrl(ddgSearch))}
            className="gap-1"
          >
            <DDGIcon className="w-[22px]" />
            DuckDuckGo
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => browse(searchExactUrl(yandexSearch))}
            className="gap-1"
          >
            <YandexIcon className="w-5" />
            Yandex
          </ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>

      <ContextMenuSub>
        <ContextMenuSubTrigger
          disabled={!text}
          className="cursor-pointer"
          onClick={() => {
            browse(searchUrl(googleSearch));
            browse(searchUrl(ddgSearch));
            browse(searchUrl(yandexSearch));
          }}
        >
          Search text
        </ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuLabel>Engine (default: all)</ContextMenuLabel>
          <ContextMenuItem
            onClick={() => browse(searchUrl(googleSearch))}
            className="gap-1"
          >
            <GoogleIcon className="w-5" />
            Google
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => browse(searchUrl(ddgSearch))}
            className="gap-1"
          >
            <DDGIcon className="w-[22px]" />
            DuckDuckGo
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => browse(searchUrl(yandexSearch))}
            className="gap-1"
          >
            <YandexIcon className="w-5" />
            Yandex
          </ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
    </>
  );
}

let timer: NodeJS.Timeout | undefined;

function textInit(text?: string) {
  return { text };
}

export const text = createNode<Text, typeof textInit>({
  icon: <TextIcon width={18} />,
  initFn: textInit,
  graphNode(props) {
    const { updateNode } = props.useReactFlow();
    const textarea = useRef<HTMLTextAreaElement>(null);

    if (textarea.current) {
      const resizeObserver = new ResizeObserver(() => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          updateNode(props.id, {
            ...props,
            height: undefined, // force reactflow to recalculate height
          });
        }, 100);
      });

      resizeObserver.observe(textarea.current);
    }

    return (
      <BaseNode
        node={props}
        className="w-[340px]"
        actions={<SearchExact text={props.data.text} />}
      >
        <h2 className="font-semibold text-base flex gap-2">
          <TextIcon width={18} />
          TEXT
        </h2>
        <Textarea
          ref={textarea}
          defaultValue={props.data.text}
          className="min-h-[3lh] h-[7lh]"
          onChange={(e) => {
            updateNode(props.id, {
              ...props,
              data: { ...props.data, text: e.target.value },
            });
          }}
        />
      </BaseNode>
    );
  },
});
