// src/components/Sidebar/Sidebar.tsx
import React from "react";
import { useWorkflow } from "../../hooks/userWorkflow";

const Sidebar: React.FC = () => {
  const { createNode } = useWorkflow();

  const handleCreateNode = (
    nodeType: "start" | "process" | "decision" | "result"
  ) => {
    createNode(nodeType, { x: 100, y: 100 });
  };

  const onDragStart = (
    event: React.DragEvent,
    nodeType: "start" | "process" | "decision"
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="h-full w-64 bg-gray-100 border-r border-gray-300 p-4">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Node Palette</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div
            className="bg-green-100 border-2 border-green-500 rounded-lg p-3 flex items-center justify-between text-green-700 font-medium cursor-move"
            draggable
            onDragStart={(e) => onDragStart(e, "start")}
          >
            <div className="flex items-center">
              <div className="mr-2 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
                S
              </div>
              Start Node
            </div>
            <button
              onClick={() => handleCreateNode("start")}
              className="px-2 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
            >
              Create
            </button>
          </div>

          <div
            className="bg-blue-100 border-2 border-blue-300 rounded-lg p-3 flex items-center justify-between text-blue-700 font-medium cursor-move"
            draggable
            onDragStart={(e) => onDragStart(e, "process")}
          >
            <div className="flex items-center">
              <div className="mr-2 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
                P
              </div>
              Process Node
            </div>
            <button
              onClick={() => handleCreateNode("process")}
              className="px-2 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
            >
              Create
            </button>
          </div>

          <div
            className="bg-yellow-100 border-2 border-yellow-500 rounded-lg p-3 flex items-center justify-between text-yellow-700 font-medium cursor-move"
            draggable
            onDragStart={(e) => onDragStart(e, "decision")}
          >
            <div className="flex items-center">
              <div className="mr-2 bg-yellow-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
                D
              </div>
              Decision Node
            </div>
            <button
              onClick={() => handleCreateNode("decision")}
              className="px-2 py-1 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600"
            >
              Create
            </button>
          </div>

          <div
            className="bg-red-100 border-2 border-red-500 rounded-lg p-3 flex items-center justify-between text-red-700 font-medium cursor-move"
            draggable
            onDragStart={(e) => onDragStart(e, "start")}
          >
            <div className="flex items-center">
              <div className="mr-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
                R
              </div>
              Result Node
            </div>
            <button
              onClick={() => handleCreateNode("result")}
              className="px-2 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
            >
              Create
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-bold mb-2 text-gray-700">Instructions</h3>
        <ul className="text-xs text-gray-600 list-disc pl-4 space-y-1">
          <li>Drag nodes or click Create button to add to canvas</li>
          <li>Connect nodes by dragging from handles</li>
          <li>Click on a node to edit its properties</li>
          <li>Use the buttons to save or load your workflow</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
