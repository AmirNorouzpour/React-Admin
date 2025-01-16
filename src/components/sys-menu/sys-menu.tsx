import React from "react";
import "./sys-menu.css";
import { QrcodeOutlined, DownOutlined } from "@ant-design/icons";

const SystemMenu: React.FC = () => {
  const systems = [
    { id: 1, name: "System 1", icon: <QrcodeOutlined /> },
    { id: 2, name: "System 2", icon: <QrcodeOutlined /> },
    { id: 3, name: "System 3", icon: <QrcodeOutlined /> },
    { id: 4, name: "System 4", icon: <QrcodeOutlined /> },
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
