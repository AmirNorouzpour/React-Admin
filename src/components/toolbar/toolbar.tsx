import React, { useState } from "react";
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
  const [disabled, setDisabled] = useState(false);

  const onButtonClickInner = (label: string, id: number) => {
    setDisabled(true);
    onButtonClick(label, id);

    setTimeout(() => {
      setDisabled(false);
    }, 300);
  };

  return (
    <div
      style={{
        padding: "5px",
        backgroundColor: "#f9fafb",
        borderRadius: "5px",
      }}
    >
      <Space>
        {buttonData.map((button) => (
          <Button
            style={{ fontSize: "11px" }}
            key={button.id}
            variant="filled"
            color={button.type === "primary" ? button.type : button.type}
            onClick={() => onButtonClickInner(button.label, button.id)}
            disabled={disabled}
          >
            {button.label}
          </Button>
        ))}
      </Space>
    </div>
  );
};

export default Toolbar;
