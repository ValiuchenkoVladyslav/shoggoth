import {
  Background,
  BackgroundVariant,
  type Connection,
  Controls,
  type FinalConnectionState,
  type Node,
  type OnNodesChange,
  ReactFlow,
  addEdge,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useEffect } from "react";
import { errorToast } from "~/components/toasts";
import type { DataGraph, DataNode } from "~/gen/core";
import { nodeTypes } from "~/nodes";
import { useProject } from "~/projects/store";
import { useEditProjectGraphMutation } from "~/projects/tauri-api";
import { newId } from "~/utils";

const graphId = "GRAPH_FLOW";

let unfinishedConnection: FinalConnectionState | undefined;

let autosaveTimeout: NodeJS.Timeout | undefined;

export function Graph(props: DataGraph) {
  const [nodes, _, _onNodesChange] = useNodesState(props.nodes as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges);
  const { addEdges } = useReactFlow();
  const editProjectGraph = useEditProjectGraphMutation();
  const projId = useProject((state) => state.project?.id!);

  const onConnect = useCallback(
    (conn: Connection) => setEdges((eds) => addEdge(conn, eds)),
    [setEdges],
  );

  // AUTOSAVE
  // biome-ignore lint/correctness/useExhaustiveDependencies: subscribing to editProjectGraph will cause infinite loop
  useEffect(() => {
    window.clearTimeout(autosaveTimeout);
    autosaveTimeout = setTimeout(() => {
      editProjectGraph.mutate({
        id: projId,
        graph: {
          nodes: nodes as DataNode[],
          edges,
        },
      });
    }, 850);
  }, [nodes, edges, projId]);

  if (editProjectGraph.error) {
    errorToast("Error saving project graph!", editProjectGraph.error);
  }

  // CREATE NEW NODE IF CONNECTION ENDED ON BLANK SPACE
  const onNodesChange = useCallback<OnNodesChange<Node>>(
    (nodes) => {
      const newNode = nodes.find((node) => node.type === "add");

      if (newNode && unfinishedConnection?.fromNode?.id) {
        addEdges({
          id: newId(),
          source: unfinishedConnection.fromNode.id,
          target: newNode.item.id,
        });
      }

      if (newNode) {
        unfinishedConnection = undefined;
      }

      _onNodesChange(nodes);
    },
    [_onNodesChange, addEdges],
  );

  const onConnectEnd = useCallback<
    NonNullable<React.ComponentProps<typeof ReactFlow>["onConnectEnd"]>
  >((event, connectionState) => {
    if (connectionState.isValid) return;

    unfinishedConnection = connectionState;

    document.getElementById(graphId)?.dispatchEvent(
      new MouseEvent("contextmenu", {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: (event as MouseEvent).clientX,
        clientY: (event as MouseEvent).clientY,
        button: 2,
      }),
    );
  }, []);

  // RECOVER EDGES WHEN DELETING MIDDLE NODE
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
      id={graphId}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onConnectEnd={onConnectEnd}
      onNodesDelete={recoverEdges}
      fitView
      proOptions={{ hideAttribution: true }}
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
