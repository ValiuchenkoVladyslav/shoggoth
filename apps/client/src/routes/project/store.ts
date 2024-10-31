import type { Edge, Node } from "@xyflow/svelte";
import { writable } from "svelte/store";
import type { TmpNode } from "~/gen/tauri";

export const nodes = writable<Node[]>([]);
export const edges = writable<Edge[]>([]);

export const tmpNodes = writable<TmpNode[]>([]);
