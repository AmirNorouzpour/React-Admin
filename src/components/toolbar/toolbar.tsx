import React from "react";
import { Button, Space, Dropdown, Menu } from "antd";
import "./toolbar.css";
import { DownOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";

const Toolbar = () => {
  return (
    <div
      style={{
        padding: "10px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Space>
        {/* Toolbar Buttons */}
        <Button className="btn" type="primary">
          New
        </Button>
        <Button className="btn">Save</Button>
        <Button className="btn" danger>
          Delete
        </Button>
      </Space>
    </div>
  );
};

export default Toolbar;
