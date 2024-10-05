import {
  Background,
  BackgroundVariant,
  type Connection,
  Controls,
  type Node,
  ReactFlow,
  addEdge,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useCallback } from "react";
import type { DataNode } from "~/gen/DataNode";
import type { DataNodeEdge } from "~/gen/DataNodeEdge";
import { newId } from "~/utils";
import { nodeTypes } from "./(nodes)";
import { edgeTypes } from "./_graph-edges";

export function Graph(props: { edges: DataNodeEdge[]; nodes: DataNode[] }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(props.nodes as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges);

  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (conn: Connection) => setEdges((eds) => addEdge(conn, eds)),
    [setEdges],
  );

  // creates a new node if the new edge ends on blank space
  const createNewNodeOnBlankSpace = useCallback<
    NonNullable<React.ComponentProps<typeof ReactFlow>["onConnectEnd"]>
  >(
    (event, connectionState) => {
      if (connectionState.isValid) return;

      const source = connectionState.fromNode!.id;

      const id = newId(source.slice(-4));

      const { clientX, clientY } = event as MouseEvent;

      setNodes((nds) =>
        nds.concat({
          id,
          position: screenToFlowPosition({ x: clientX, y: clientY }),
          data: { label: `Node ${id}` },
        }),
      );

      setEdges((eds) => eds.concat({ id, source, target: id }));
    },
    [screenToFlowPosition, setNodes, setEdges],
  );

  // recovers edges if a middle node is deleted
  // example: A --> B --> C, delete B, recover A --> C
  const recoverEdges = useCallback<
    NonNullable<React.ComponentProps<typeof ReactFlow>["onNodesDelete"]>
  >(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge),
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: newId(source.slice(-4)),
              source,
              target,
            })),
          );

          return [...remainingEdges, ...createdEdges];
        }, edges),
      );
    },
    [nodes, edges, setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onConnectEnd={createNewNodeOnBlankSpace}
      onNodesDelete={recoverEdges}
      fitView
      proOptions={{ hideAttribution: true }}
      edgeTypes={edgeTypes}
      nodeTypes={nodeTypes}
      deleteKeyCode="Delete"
    >
      <Background variant={BackgroundVariant.Dots} />
      <Controls
        className="*:!layer-dark rounded-md overflow-hidden border-2 border-white"
        position="top-left"
      />
    </ReactFlow>
  );
}
