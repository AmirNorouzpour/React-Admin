import { UserOutlined, ApartmentOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import type { TreeDataNode } from "antd";
import React from "react";
import Toolbar from "../toolbar/toolbar.tsx";
import "./org-chart.css";

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

const OrgChart: React.FC = () => {
  return (
    <div>
      <Toolbar />

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
