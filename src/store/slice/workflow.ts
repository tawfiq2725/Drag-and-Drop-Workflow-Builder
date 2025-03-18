import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Node, Edge } from "reactflow";
import { WorkflowState, NodeData } from "./types";
import { saveWorkflow, loadWorkflow } from "../../api/api";

const initialState: WorkflowState = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
  isLoading: false,
  error: null,
};

export const saveWorkflowAsync = createAsyncThunk(
  "workflow/saveWorkflow",
  async ({ nodes, edges }: { nodes: Node<NodeData>[]; edges: Edge[] }) => {
    return await saveWorkflow({ nodes, edges });
  }
);

export const loadWorkflowAsync = createAsyncThunk(
  "workflow/loadWorkflow",
  async () => {
    return await loadWorkflow();
  }
);

const workflowSlice = createSlice({
  name: "workflow",
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<Node<NodeData>[]>) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    addNode: (state, action: PayloadAction<Node<NodeData>>) => {
      state.nodes.push(action.payload);
    },
    updateNode: (
      state,
      action: PayloadAction<{ id: string; data: Partial<NodeData> }>
    ) => {
      const { id, data } = action.payload;
      const node = state.nodes.find((node) => node.id === id);
      if (node) {
        node.data = { ...node.data, ...data };
      }
    },
    removeNode: (state, action: PayloadAction<string>) => {
      const nodeId = action.payload;
      state.nodes = state.nodes.filter((node) => node.id !== nodeId);
      state.edges = state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      );
      if (state.selectedNodeId === nodeId) {
        state.selectedNodeId = null;
      }
    },
    selectNode: (state, action: PayloadAction<string | null>) => {
      state.selectedNodeId = action.payload;
    },
    clearSelection: (state) => {
      state.selectedNodeId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveWorkflowAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveWorkflowAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(saveWorkflowAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to save workflow";
      })
      .addCase(loadWorkflowAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadWorkflowAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.nodes = action.payload.nodes;
        state.edges = action.payload.edges;
      })
      .addCase(loadWorkflowAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to load workflow";
      });
  },
});

export const {
  setNodes,
  setEdges,
  addNode,
  updateNode,
  removeNode,
  selectNode,
  clearSelection,
} = workflowSlice.actions;

export default workflowSlice.reducer;
