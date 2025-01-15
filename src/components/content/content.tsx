import React from "react";
import "./content.css";
import Sidebar from "../sidebar/sidebar.tsx";

const Content: React.FC = () => {
  return (
    <div className="content">
      <Sidebar />
    </div>
  );
};

export default Content;
