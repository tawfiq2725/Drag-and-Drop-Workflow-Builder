import { Node, Edge } from "reactflow";
import { NodeData } from "../store/slice/types";

// Mock API implementation using localStorage
const WORKFLOW_STORAGE_KEY = "workflow-builder-data";

export const saveWorkflow = async ({
  nodes,
  edges,
}: {
  nodes: Node<NodeData>[];
  edges: Edge[];
}) => {
  try {
    const workflowData = JSON.stringify({ nodes, edges });
    localStorage.setItem(WORKFLOW_STORAGE_KEY, workflowData);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true };
  } catch (error) {
    console.error("Error saving workflow:", error);
    throw new Error("Failed to save workflow");
  }
};

export const loadWorkflow = async () => {
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    const workflowData = localStorage.getItem(WORKFLOW_STORAGE_KEY);

    if (!workflowData) {
      return { nodes: [], edges: [] };
    }

    return JSON.parse(workflowData);
  } catch (error) {
    console.error("Error loading workflow:", error);
    throw new Error("Failed to load workflow");
  }
};
