import { UserOutlined, ApartmentOutlined } from "@ant-design/icons";
import { Card, Tree, Spin } from "antd";
import type { TreeDataNode } from "antd";
import React, { useEffect, useState } from "react";
import Toolbar from "../toolbar/toolbar.tsx";
import "./org-chart.css";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../../services/apiService.ts";

const buttonData = [
  { id: 1, label: "New", type: "primary" },
  { id: 3, label: "Delete", type: "danger", hasConfirm: true },
];

const OrgChart: React.FC = () => {
  const navigate = useNavigate();
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleButtonClick = (label: string, id: number) => {
    console.log(`Button Clicked: ${label}, ID: ${id}`);
    if (id === 1) {
      navigate("/org-chart/new", { state: { selectedKey } });
    }
  };

  const buildTreeRecursive = (
    data: any[],
    parent: string | null
  ): TreeDataNode[] => {
    return data
      .filter((item) => item.parent === parent)
      .map((item) => ({
        title: item.name,
        key: item.key,
        icon:
          item.type === "department" ? <ApartmentOutlined /> : <UserOutlined />,
        children: buildTreeRecursive(data, item.key),
      }));
  };

  const fetchTreeData = async () => {
    try {
      setLoading(true);

      const data = await getRequest<any[]>("/org/gettree");

      const transformedData = buildTreeRecursive(data, null);

      setTreeData(transformedData);
    } catch (error) {
      console.error("Error fetching tree data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log("Selected:", selectedKeys, info);
    setSelectedKey(selectedKeys.length > 0 ? String(selectedKeys[0]) : null);
  };

  useEffect(() => {
    fetchTreeData();
  }, []);

  return (
    <Card
      title="Organization Chart"
      type="inner"
      extra={
        <Toolbar buttonData={buttonData} onButtonClick={handleButtonClick} />
      }
    >
      {loading ? (
        <Spin tip="Loading..." />
      ) : (
        <Tree
          className="tree"
          showIcon
          showLine
          defaultExpandAll
          defaultSelectedKeys={["0"]}
          treeData={treeData}
          onSelect={onSelect}
        />
      )}
    </Card>
  );
};

export default OrgChart;
