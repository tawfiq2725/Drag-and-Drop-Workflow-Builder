import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { selectNode, clearSelection } from "../store/slice/workflow";

export const useNodeSelection = () => {
  const dispatch = useDispatch();
  const selectedNodeId = useSelector(
    (state: RootState) => state.workflow.selectedNodeId
  );
  const nodes = useSelector((state: RootState) => state.workflow.nodes);

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  const selectNodeById = useCallback(
    (nodeId: string | null) => {
      dispatch(selectNode(nodeId));
    },
    [dispatch]
  );

  const clearNodeSelection = useCallback(() => {
    dispatch(clearSelection());
  }, [dispatch]);

  return {
    selectedNodeId,
    selectedNode,
    selectNodeById,
    clearNodeSelection,
  };
};
