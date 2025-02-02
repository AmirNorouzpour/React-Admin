import React, { useEffect, useState } from "react";
import { AppstoreOutlined, DatabaseOutlined } from "@ant-design/icons";
import { getRequest } from "../../../services/apiService.ts";
import { TreeSelect } from "antd";

const TypeDefTreeSelect: React.FC<{ value; onChange }> = ({
  value,
  onChange,
}) => {
  const [typedefTreeData, setTypedefTreeData] = useState<[]>([]);

  useEffect(() => {
    loadTypedefData("");
  }, [value]);

  const onChange_inner = async (v) => {
    value = v;
    onChange(value);
  };
  const loadTypedefData = async (searchText: string) => {
    // if (searchText.length < 3) return;
    try {
      const params = createQueryParams(
        "5BFD40B1-63FE-46A4-AB58-104A1CF9680A",
        searchText
      );
      const response = await getRequest<[]>(`/api/generic?${params}`);
      const tree = transformTypedefData(response.data);
      setTypedefTreeData(tree);
    } catch (error) {
      console.error("Error loading typedef data", error);
    }
  };

  const createQueryParams = (reportId: string, searchText: string) => {
    const filters = {
      rules: [
        {
          field: "Name",
          operator: "like",
          value: searchText,
          entity: "Typedefs",
        },
      ],
      condition: "and",
    };

    return new URLSearchParams({
      reportId,
      filters: JSON.stringify(filters),
    }).toString();
  };

  const transformTypedefData = (data: any[]): [] => {
    const groupedData: Record<string, any> = {};

    data.forEach((item) => {
      const { SystemId, SystemName, Name, Id } = item;

      if (!groupedData[SystemId]) {
        groupedData[SystemId] = {
          label: SystemName,
          value: SystemId,
          icon: <AppstoreOutlined />,
          children: [],
          selectable: false,
        };
      }

      groupedData[SystemId].children.push({
        label: Name,
        value: Id,
        icon: <DatabaseOutlined />,
      });
    });

    return Object.values(groupedData);
  };

  return (
    <TreeSelect
      showSearch
      style={{ width: "100%" }}
      value={value}
      placeholder="Select a typedef"
      treeData={typedefTreeData}
      allowClear
      treeLine={true}
      onSearch={loadTypedefData}
      onChange={onChange_inner}
      treeIcon={true}
      filterTreeNode={(input, node) =>
        node.label.toLowerCase().includes(input.toLowerCase())
      }
    />
  );
};

export default TypeDefTreeSelect;
