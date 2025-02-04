import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  DatabaseOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { getRequest } from "../../../services/apiService.ts";
import { TreeSelect } from "antd";

const ReportTreeSelect: React.FC<{ value; onChange; isDisabled }> = ({
  value,
  onChange,
  isDisabled,
}) => {
  const [reportTreeData, setReportTreeData] = useState<[]>([]);

  useEffect(() => {
    loadReportData("");
  }, [value]);

  const onChange_inner = async (v) => {
    value = v;
    onChange(value);
  };

  const loadReportData = async (searchText: string) => {
    // if (searchText.length < 3) return;
    try {
      const params = createQueryParams(
        "dede0745-37ca-43b0-9a15-7489f78bb7b2",
        searchText
      );
      const response = await getRequest<[]>(`/api/generic?${params}`);
      console.log(response);
      const tree = transformReportData(response.data);
      setReportTreeData(tree);
    } catch (error) {
      console.error("Error loading report data", error);
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

  const transformReportData = (data: any[]): [] => {
    const tree: any[] = [];

    const groupedData = data.reduce((acc: any, item: any) => {
      const { SystemName, TypeDef, Name, Id } = item;

      if (!acc[SystemName]) acc[SystemName] = {};
      if (!acc[SystemName][TypeDef]) acc[SystemName][TypeDef] = [];

      acc[SystemName][TypeDef].push({
        label: Name,
        value: Id,
        icon: <FileDoneOutlined />,
      });
      return acc;
    }, {});

    Object.keys(groupedData).forEach((systemName) => {
      const children = Object.keys(groupedData[systemName]).map(
        (typedefName) => ({
          label: typedefName,
          value: typedefName,
          icon: <DatabaseOutlined />,
          selectable: false,
          children: groupedData[systemName][typedefName],
        })
      );

      tree.push({
        label: systemName,
        value: systemName,
        icon: <AppstoreOutlined />,
        selectable: false,
        children,
      });
    });

    return tree;
  };

  return (
    <TreeSelect
      showSearch
      style={{ width: "100%" }}
      value={value}
      placeholder="Select a report"
      treeData={reportTreeData}
      allowClear
      treeIcon={true}
      disabled={isDisabled}
      onSearch={loadReportData}
      treeLine={true}
      onChange={onChange_inner}
      filterTreeNode={(input, node) =>
        node.label.toLowerCase().includes(input.toLowerCase())
      }
    />
  );
};

export default ReportTreeSelect;
