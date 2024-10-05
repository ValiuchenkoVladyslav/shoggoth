import {
  BaseEdge,
  type Edge,
  EdgeLabelRenderer,
  type EdgeProps,
  type EdgeTypes,
  getBezierPath,
} from "@xyflow/react";

export const edgeTypes: EdgeTypes = {
  default(props: EdgeProps<Edge<{ label: string }>>) {
    const [edgePath, labelX, labelY] = getBezierPath(props);

    return (
      <>
        <BaseEdge id={props.id} path={edgePath} interactionWidth={20} />
        {props.label && (
          <EdgeLabelRenderer>
            <div
              style={{
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              }}
              className="nodrag nopan absolute rounded-lg text-xs font-semibold px-2 py-1 layer-dark"
            >
              {props.label}
            </div>
          </EdgeLabelRenderer>
        )}
      </>
    );
  },
};
