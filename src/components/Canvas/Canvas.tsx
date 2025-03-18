import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";

import { useWorkflow } from "../../hooks/userWorkflow";
import { useNodeSelection } from "../../hooks/userNode";
import StartNode from "../Nodes/startNode";
import ProcessNode from "../Nodes/processNode";
import DecisionNode from "../Nodes/decisionNode";
import { NODE_TYPES } from "../../types/node";

const nodeTypes = {
  [NODE_TYPES.start]: StartNode,
  [NODE_TYPES.process]: ProcessNode,
  [NODE_TYPES.decision]: DecisionNode,
};

const Canvas: React.FC = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, createNode } =
    useWorkflow();

  const { selectNodeById, clearNodeSelection } = useNodeSelection();
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const onInit = useCallback((instance: ReactFlowInstance) => {
    setReactFlowInstance(instance);
  }, []);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow") as
        | "start"
        | "process"
        | "decision";

      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      createNode(type, position);
    },
    [reactFlowInstance, createNode]
  );

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: any) => {
      selectNodeById(node.id);
    },
    [selectNodeById]
  );

  const onPaneClick = useCallback(() => {
    clearNodeSelection();
  }, [clearNodeSelection]);

  return (
    <div className="h-full w-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        className="bg-white"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={16}
          size={1}
          color="#e2e8f0"
        />
        <Controls />
        <MiniMap
          nodeStrokeColor={(n) => {
            switch (n.type) {
              case NODE_TYPES.start:
                return "#10b981";
              case NODE_TYPES.process:
                return "#3b82f6";
              case NODE_TYPES.decision:
                return "#eab308";
              default:
                return "#71717a";
            }
          }}
          nodeBorderRadius={2}
        />
      </ReactFlow>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <Canvas />
  </ReactFlowProvider>
);
