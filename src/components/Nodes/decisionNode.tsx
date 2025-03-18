import React, { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { NodeData } from "../../store/slice/types";

const DecisionNode: React.FC<NodeProps<NodeData>> = ({
  data,
  isConnectable,
  selected,
}) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center p-4 rotate-45 bg-yellow-50 border-2 w-32 h-32 ${
        selected ? "border-blue-500" : "border-yellow-500"
      }`}
    >
      <div className="text-sm font-bold text-yellow-800 -rotate-45">
        {data.label}
      </div>
      {data.description && (
        <div className="text-xs text-yellow-600 mt-1 truncate max-w-full -rotate-45">
          {data.description}
        </div>
      )}
      <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs -rotate-45">
        D
      </div>
      <Handle
        type="target"
        position={Position.Top}
        id="in"
        className="w-3 h-3 bg-yellow-700 -rotate-45"
        isConnectable={isConnectable}
        style={{ transform: "translateX(0) translateY(-16px) rotate(-45deg)" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="out-yes"
        className="w-3 h-3 bg-yellow-700 -rotate-45"
        isConnectable={isConnectable}
        style={{ transform: "translateX(0) translateY(16px) rotate(-45deg)" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="out-no"
        className="w-3 h-3 bg-yellow-700 -rotate-45"
        isConnectable={isConnectable}
        style={{ transform: "translateX(16px) translateY(0) rotate(-45deg)" }}
      />
    </div>
  );
};

export default memo(DecisionNode);
