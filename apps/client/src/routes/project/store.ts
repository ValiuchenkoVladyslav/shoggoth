import type { Edge, Node } from "@xyflow/svelte";
import { writable } from "svelte/store";

export const nodes = writable<Node[]>([]);
export const edges = writable<Edge[]>([]);
