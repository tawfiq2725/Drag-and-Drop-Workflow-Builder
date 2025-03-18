import { Node, Edge } from "reactflow";

export interface NodeData {
  label: string;
  description?: string;
  type: "start" | "process" | "decision";
  parameters?: Record<string, any>;
}

export interface WorkflowState {
  nodes: Node<NodeData>[];
  edges: Edge[];
  selectedNodeId: string | null;
  isLoading: boolean;
  error: string | null;
}
