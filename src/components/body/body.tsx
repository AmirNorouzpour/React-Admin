import React from "react";
import "./body.css";
import Sidebar from "../sidebar/sidebar.tsx";

const Body: React.FC = () => {
  return (
    <div className="body">
      <Sidebar />
    </div>
  );
};

export default Body;
