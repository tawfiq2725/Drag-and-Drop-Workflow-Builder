import React, { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { NodeData } from "../../store/slice/types";

const ResultNode: React.FC<NodeProps<NodeData>> = ({
  data,
  isConnectable,
  selected,
}) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center p-4 rounded-lg bg-red-50 border-2 w-40 h-24 ${
        selected ? "border-blue-500" : "border-red-500"
      }`}
    >
      <div className="text-sm font-bold text-red-800">{data.label}</div>
      {data.description && (
        <div className="text-xs text-red-600 mt-1 truncate max-w-full">
          {data.description}
        </div>
      )}
      <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
        R
      </div>
      <Handle
        type="target"
        position={Position.Top}
        id="in"
        className="w-3 h-3 bg-red-700"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(ResultNode);
