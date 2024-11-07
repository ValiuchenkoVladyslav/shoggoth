import type { NodeProps } from "@xyflow/svelte";

declare global {
  type TypedNode<T extends Record<string, unknown>> = NodeProps & {
    data: T;
  };
}
