import { UserOutlined, ApartmentOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import type { TreeDataNode } from "antd";
import React from "react";
import Toolbar from "../toolbar/toolbar.tsx";
import "./org-chart.css";
import { useNavigate } from "react-router-dom";

const treeData: TreeDataNode[] = [
  {
    title: "Org",
    key: "0",
    icon: <ApartmentOutlined />,
    children: [
      {
        title: "CEO",
        key: "0-0",
        icon: <UserOutlined />,
      },
    ],
  },
];

const buttonData = [
  { id: 1, label: "New", type: "primary" },
  { id: 2, label: "Save", type: "default" },
  { id: 3, label: "Delete", type: "danger" },
];
const OrgChart: React.FC = () => {
  const navigate = useNavigate();
  const handleButtonClick = (label: string, id: number) => {
    console.log(`Button Clicked: ${label}, ID: ${id}`);
    if (id === 1) {
      navigate("/org/new");
    }
  };

  return (
    <div>
      <Toolbar buttonData={buttonData} onButtonClick={handleButtonClick} />
      <Tree
        className="tree"
        showIcon
        showLine
        defaultExpandAll
        defaultSelectedKeys={["0"]}
        treeData={treeData}
      />
    </div>
  );
};

export default OrgChart;
