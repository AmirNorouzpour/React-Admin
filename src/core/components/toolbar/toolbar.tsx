import React, { useState } from "react";
import { Button, Space, Popconfirm } from "antd";
import { buttonData } from "../../models/button-data.ts";
// import { SaveTwoTone } from "@ant-design/icons";

import "./toolbar.css";

interface ToolbarProps {
  buttonData: buttonData[];
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
        {buttonData.map((button) =>
          button.hasConfirm ? (
            <Popconfirm
              key={button.id}
              title="Are you sure?"
              onConfirm={() => onButtonClickInner(button.label, button.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                style={{ fontSize: "11px" }}
                variant="filled"
                color={button.type === "primary" ? button.type : button.type}
                disabled={disabled}
              >
                {button.label}
              </Button>
            </Popconfirm>
          ) : (
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
          )
        )}
      </Space>
    </div>
  );
};

export default Toolbar;
