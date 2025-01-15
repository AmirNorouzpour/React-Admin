import React, { useState } from "react";
import "./sidebar.css";

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`ax-sidebar ${isCollapsed ? "ax-sidebar-collapsed" : ""}`}>
      <div className="ax-sidebar-header">
        <div className="ax-sidebar-system-info">
          <span className="ax-sidebar-system-info-icon" id="info-icon">
            <i className="large material-icons">business</i>
          </span>
          <span className="ax-sidebar-system-info-title">
            Basic Informations
          </span>
        </div>
        <div className="ax-sidebar-toggle-btn">
          <div id="ccc" onClick={toggleSidebar}>
            <i className="large material-icons">chevron_left</i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
