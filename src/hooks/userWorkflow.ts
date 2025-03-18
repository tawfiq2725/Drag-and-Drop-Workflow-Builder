// src/hooks/useWorkflow.ts

import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";

import {
  Node,
  Connection,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import { v4 as uuidv4 } from "uuid";
import { AppDispatch, RootState } from "../store/store";
import {
  setNodes,
  setEdges,
  addNode,
  removeNode,
  updateNode,
  saveWorkflowAsync,
  loadWorkflowAsync,
} from "../store/slice/workflow";
import { NodeData } from "../store/slice/types";

export const useWorkflow = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { nodes, edges, isLoading, error } = useSelector(
    (state: RootState) => state.workflow
  );

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      dispatch(setNodes(applyNodeChanges(changes, nodes)));
    },
    [nodes, dispatch]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      dispatch(setEdges(applyEdgeChanges(changes, edges)));
    },
    [edges, dispatch]
  );

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      dispatch(
        setEdges([
          ...edges,
          {
            id: `e-${uuidv4()}`,
            source: connection.source || "",
            target: connection.target || "",
            sourceHandle: connection.sourceHandle,
            targetHandle: connection.targetHandle,
            animated: true,
          },
        ])
      );
    },
    [edges, dispatch]
  );

  const createNode = useCallback(
    (
      type: "start" | "process" | "decision",
      position: { x: number; y: number }
    ) => {
      const newNode: Node<NodeData> = {
        id: `node-${uuidv4()}`,
        type,
        position,
        data: {
          label: type.charAt(0).toUpperCase() + type.slice(1),
          type,
          description: "",
          parameters: {},
        },
      };
      dispatch(addNode(newNode));
      return newNode;
    },
    [dispatch]
  );

  const deleteNode = useCallback(
    (nodeId: string) => {
      dispatch(removeNode(nodeId));
    },
    [dispatch]
  );

  const updateNodeData = useCallback(
    (nodeId: string, data: Partial<NodeData>) => {
      dispatch(updateNode({ id: nodeId, data }));
    },
    [dispatch]
  );

  const saveWorkflow = useCallback(() => {
    dispatch(saveWorkflowAsync({ nodes, edges }));
  }, [dispatch, nodes, edges]);

  const loadWorkflow = useCallback(() => {
    dispatch(loadWorkflowAsync());
  }, [dispatch]);

  return {
    nodes,
    edges,
    isLoading,
    error,
    onNodesChange,
    onEdgesChange,
    onConnect,
    createNode,
    deleteNode,
    updateNodeData,
    saveWorkflow,
    loadWorkflow,
  };
};
