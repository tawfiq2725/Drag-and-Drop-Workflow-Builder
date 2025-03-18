// src/components/Layout/MainLayout.tsx
import React from "react";
import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import Canvas from "../Canvas/Canvas";
import PropertiesPanel from "../Properties";

const MainLayout: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 relative">
          <Canvas />
        </div>
        <PropertiesPanel />
      </div>
    </div>
  );
};

export default MainLayout;
