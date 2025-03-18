import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import MainLayout from "./components/Layout/Mainlayout";
import "./index.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainLayout />
    </Provider>
  );
};

export default App;
