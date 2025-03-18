// src/components/PropertiesPanel/PropertiesPanel.tsx
import React, { useState, useEffect } from "react";
import { useNodeSelection } from "../hooks/userNode";
import { useWorkflow } from "../hooks/userWorkflow";
import { NodeData } from "../store/slice/types";

const PropertiesPanel: React.FC = () => {
  const { selectedNode, selectedNodeId } = useNodeSelection();
  const { updateNodeData, deleteNode } = useWorkflow();
  const [nodeData, setNodeData] = useState<NodeData | null>(null);

  useEffect(() => {
    if (selectedNode) {
      setNodeData({ ...selectedNode.data });
    } else {
      setNodeData(null);
    }
  }, [selectedNode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNodeData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSave = () => {
    if (selectedNodeId && nodeData) {
      updateNodeData(selectedNodeId, nodeData);
    }
  };

  const handleDelete = () => {
    if (selectedNodeId) {
      deleteNode(selectedNodeId);
    }
  };

  if (!selectedNode || !nodeData) {
    return (
      <div className="h-full w-64 bg-gray-100 border-l border-gray-300 p-4">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Properties</h2>
        <p className="text-sm text-gray-500">
          Select a node to edit its properties
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-64 bg-gray-100 border-l border-gray-300 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Properties</h2>
        <span className="text-xs px-2 py-1 bg-gray-200 rounded-full text-gray-700">
          {nodeData.type}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Label
          </label>
          <input
            type="text"
            name="label"
            value={nodeData.label}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={nodeData.description || ""}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {nodeData.type === "decision" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Condition
            </label>
            <input
              type="text"
              name="condition"
              value={(nodeData.parameters?.condition as string) || ""}
              onChange={(e) => {
                const value = e.target.value;
                setNodeData((prev) =>
                  prev
                    ? {
                        ...prev,
                        parameters: { ...prev.parameters, condition: value },
                      }
                    : null
                );
              }}
              className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        {nodeData.type === "process" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Process Type
            </label>
            <select
              value={(nodeData.parameters?.processType as string) || "default"}
              onChange={(e) => {
                const value = e.target.value;
                setNodeData((prev) =>
                  prev
                    ? {
                        ...prev,
                        parameters: { ...prev.parameters, processType: value },
                      }
                    : null
                );
              }}
              className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="default">Default</option>
              <option value="calculation">Calculation</option>
              <option value="api">API Call</option>
              <option value="notification">Notification</option>
            </select>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
          >
            Save
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;
