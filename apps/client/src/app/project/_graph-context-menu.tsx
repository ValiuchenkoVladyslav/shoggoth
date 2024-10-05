import { useReactFlow } from "@xyflow/react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import { newId } from "~/utils";

export function GraphContextMenu(props: React.PropsWithChildren) {
  const { screenToFlowPosition, addNodes } = useReactFlow();

  return (
    <ContextMenu>
      <ContextMenuTrigger {...props} />
      <ContextMenuContent>
        <ContextMenuItem
          onClick={(event) => {
            addNodes({
              id: newId(),
              position: screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
              }),
              data: { label: "Node" },
            });
          }}
        >
          Add Text Node
        </ContextMenuItem>
        <ContextMenuItem
          onClick={(event) => {
            addNodes({
              id: newId(),
              position: screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
              }),
              type: "phone",
              data: { label: "Node" },
            });
          }}
        >
          Add Phone Node
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
