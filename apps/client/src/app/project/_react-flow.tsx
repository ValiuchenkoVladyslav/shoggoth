import {
  Background,
  BackgroundVariant,
  type Connection,
  Controls,
  ReactFlow as _ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useCallback } from "react";
import type { DataNode } from "~/gen/DataNode";
import type { DataNodeEdge } from "~/gen/DataNodeEdge";

export function ReactFlow({
  edges: _edges,
  nodes: _nodes,
}: {
  edges: DataNodeEdge[];
  nodes: DataNode[];
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(_nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(_edges);

  const onConnect = useCallback(
    (conn: Connection) => setEdges((eds) => addEdge(conn, eds)),
    [setEdges],
  );

  return (
    <_ReactFlow
      nodes={nodes}
      edges={edges}
      fitView
      proOptions={{ hideAttribution: true }}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      <Background variant={BackgroundVariant.Dots} />
      <Controls
        className="*:!layer-dark rounded-md overflow-hidden"
        position="top-left"
      />
    </_ReactFlow>
  );
}
