import { create } from "zustand";
import type { TmpNode } from "~/gen/tauri";
import type { InferParams } from "~/utils";

export const useTmpNodes = create((...args: unknown[]) => {
  const [set, get] = args as InferParams<typeof useTmpNodes>;

  return {
    tmpNodes: [] as TmpNode[],

    addTmpNode(node: TmpNode) {
      set({ tmpNodes: [...get().tmpNodes, node] });
    },
    removeTmpNode(id: bigint) {
      set({ tmpNodes: get().tmpNodes.filter((node) => node.id !== id) });
    },
  };
});
