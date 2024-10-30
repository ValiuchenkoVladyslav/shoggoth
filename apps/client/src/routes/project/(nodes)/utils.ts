import type { NodeProps } from "@xyflow/svelte";

export type TypedNode<T extends Record<string, unknown>> = NodeProps & {
  data: T;
};
