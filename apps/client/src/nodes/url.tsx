import { Link } from "lucide-react";
import type { Url } from "~/gen/core";
import { BaseNode, createNode } from "./utils";

function urlInit(url = "") {
  return { url };
}

export const url = createNode<Url, typeof urlInit>({
  type: "url",
  icon: <Link width={18} />,
  initFn: urlInit,
  graphNode(props) {
    return (
      <BaseNode
        node={props}
        className="w-[340px]"
        actions={[<p key="ARCHIVE_RESERVED">internet archive reserved</p>]}
      >
        <h2 className="font-semibold flex gap-2">
          <Link width={18} />
          URL
        </h2>
        <p className="cursor-auto select-text nodrag">{props.data.url}</p>
      </BaseNode>
    );
  },
});
