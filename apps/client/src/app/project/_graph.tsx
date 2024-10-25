import {
  Background,
  BackgroundVariant,
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
import type { DataGraph, Node as DataNode } from "~/gen/core";
import type { TmpNode } from "~/gen/tauri";
import { nodeTypes } from "~/nodes";
import { useProject } from "~/projects/store";
import { useEditProjectGraphMutation } from "~/projects/tauri-api";
import { newId } from "~/utils";
import { useTmpNodes } from "./_use-tmp-nodes";

const graphId = "GRAPH_FLOW";

let unfinishedConnection: FinalConnectionState | undefined;

let autosaveTimeout: NodeJS.Timeout | undefined;

export function Graph(props: DataGraph) {
  const [nodes, _, _onNodesChange] = useNodesState(props.nodes as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges);
  const { addEdges, addNodes, screenToFlowPosition } = useReactFlow();
  const editProjectGraph = useEditProjectGraphMutation();
  const projId = useProject((state) => state.project?.id!);
  const removeTmpNode = useTmpNodes((state) => state.removeTmpNode);

  // AUTOSAVE
  // biome-ignore lint/correctness/useExhaustiveDependencies: subscribing to editProjectGraph will cause infinite loop
  useEffect(() => {
    clearTimeout(autosaveTimeout);
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

  const joinNewNodeToUnfinishedConnection = useCallback<OnNodesChange<Node>>(
    (nodes) => {
      const newNode = nodes.find((node) => node.type === "add");

      if (newNode && unfinishedConnection?.fromNode?.id) {
        addEdges({
          id: newId(),
          source: unfinishedConnection.fromNode.id,
          target: newNode.item.id,
        });
      }

      if (newNode) unfinishedConnection = undefined;

      _onNodesChange(nodes);
    },
    [_onNodesChange, addEdges],
  );

  const callNodeCreationCtxMenuOnBlankSpace = useCallback<
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
      onNodesChange={joinNewNodeToUnfinishedConnection}
      onEdgesChange={onEdgesChange}
      onConnect={(conn) => setEdges((eds) => addEdge(conn, eds))}
      onConnectEnd={callNodeCreationCtxMenuOnBlankSpace}
      onNodesDelete={recoverEdges}
      fitView
      proOptions={{ hideAttribution: true }}
      nodeTypes={nodeTypes}
      deleteKeyCode="Delete"
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
      onDrop={(e) => {
        try {
          const tmpNode: TmpNode = JSON.parse(
            e.dataTransfer.getData("text/plain"),
          );

          removeTmpNode(tmpNode.id);

          addNodes({
            id: newId(),
            position: screenToFlowPosition({ x: e.clientX, y: e.clientY }),
            type: tmpNode.type,
            data: JSON.parse(tmpNode.data),
          });
        } catch (e) {
          errorToast("Failed to create node!", String(e));
        }
      }}
    >
      <Background variant={BackgroundVariant.Dots} />
      <Controls
        className="*:!layer-dark rounded-md overflow-hidden border-2 border-white"
        position="top-left"
      />
    </ReactFlow>
  );
}
