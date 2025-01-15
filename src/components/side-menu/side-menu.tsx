import React, { useState } from "react";
import "./side-menu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideMenu: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [icon, setIcon] = useState("chevron-down");
  const toggleMenu = () => {
    debugger;
    setIsCollapsed(!isCollapsed);
    if (isCollapsed) {
      setIcon("chevron-down");
    } else {
      setIcon("chevron-up");
    }
  };

  return (
    <ul className="ax-side-menu">
      <li className="ax-side-menu-item">
        <div className="ax-side-menu-item-icon">
          <FontAwesomeIcon icon="user" />
        </div>
        <div className="menu-item-title">Users</div>
        <div className="menu-item-expand" onClick={toggleMenu}>
          <FontAwesomeIcon icon={icon} />
        </div>
      </li>
      <div
        className={`menu-items ${isCollapsed ? "menu-items-collapsed" : ""}`}
      >
        <div>
          <FontAwesomeIcon icon="users" />
        </div>
        <div className="menu-item-child-title">User List</div>
      </div>
    </ul>
  );
};

export default SideMenu;
