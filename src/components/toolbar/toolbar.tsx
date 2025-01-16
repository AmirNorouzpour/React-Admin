import React from "react";
import { Button, Space, Dropdown, Menu } from "antd";
import "./toolbar.css";
import { DownOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";

interface ButtonData {
  id: number;
  label: string;
  type: "primary" | "default" | "dashed" | "text" | "link" | "danger";
}

interface ToolbarProps {
  buttonData: ButtonData[];
  onButtonClick: (label: string, id: number) => void;
}
const Toolbar: React.FC<ToolbarProps> = ({ buttonData, onButtonClick }) => {
  return (
    <div
      style={{
        padding: "10px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Space>
        {buttonData.map((button) => (
          <Button
            key={button.id}
            type={button.type === "danger" ? "default" : button.type}
            danger={button.type === "danger"}
            onClick={() => onButtonClick(button.label, button.id)}
          >
            {button.label}
          </Button>
        ))}
      </Space>
    </div>
  );
};

export default Toolbar;
