import React, { useState } from "react";
import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideMenu from "../side-menu/side-menu.tsx";  

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [icon, setIcon] = useState("chevron-left");
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (isCollapsed) setIcon("chevron-left");
    else setIcon("chevron-right");
  };

  return (
    <div className={`ax-sidebar ${isCollapsed ? "ax-sidebar-collapsed" : ""}`}>
      <div className="ax-sidebar-header">
        <div className="ax-sidebar-system-info">
          <span className="ax-sidebar-system-info-icon" id="info-icon">
            <FontAwesomeIcon icon="house" />
          </span>
          <span className="ax-sidebar-system-info-title">
            Basic Informations
          </span>
        </div>
        <div className="ax-sidebar-toggle-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={icon} />
        </div>
      </div>
      <SideMenu />
    </div>
  );
};

export default Sidebar;
