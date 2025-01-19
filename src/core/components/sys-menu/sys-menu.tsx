import React from "react";
import "./sys-menu.css";
import { AppstoreOutlined } from "@ant-design/icons";

const SystemMenu: React.FC = () => {
  const systems = [
    { id: 1, name: "System 1", icon: <AppstoreOutlined /> },
    { id: 2, name: "System 2", icon: <AppstoreOutlined /> },
    { id: 3, name: "System 3", icon: <AppstoreOutlined /> },
    { id: 4, name: "System 4", icon: <AppstoreOutlined /> },
  ];
  return (
    <div className="system-grid">
      {systems.map((system) => (
        <div key={system.id} className="system-item">
          {system.icon}
          <span>{system.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SystemMenu;
