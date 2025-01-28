import React, { useEffect, useState } from "react";
import { Form, Row, Col, TreeSelect, Checkbox } from "antd";
import { getRequest } from "../../../../services/apiService.ts";
import {
  AppstoreOutlined,
  DatabaseOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";

const R1NSettings: React.FC = () => {
  const [typedefTreeData, setTypedefTreeData] = useState<[]>([]);
  const [reportTreeData, setReportTreeData] = useState<[]>([]);
  const [typedefValue, setTypedefValue] = useState<string | undefined>(
    undefined
  );
  const [reportValue, setReportValue] = useState<string | undefined>(undefined);
  const [searchText, setSearchText] = useState("");
  const [reportSearchText, setReportSearchText] = useState("");
  const [isReportEnabled, setIsReportEnabled] = useState(false);

  useEffect(() => {
    loadTypedefData("");
    loadReportData("");
  }, []);

  const loadTypedefData = async (searchText: string) => {
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

  const loadReportData = async (searchText: string) => {
    try {
      const params = createQueryParams(
        "1e45d3d0-1639-4140-8e53-3d6fe6855b24",
        searchText
      );
      const response = await getRequest<[]>(`/api/generic?${params}`);
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

  const transformReportData = (data: any[]): [] => {
    const tree: any[] = [];

    const groupedData = data.reduce((acc: any, item: any) => {
      const { SystemName, TypedefName, Name, Id } = item;

      if (!acc[SystemName]) acc[SystemName] = {};
      if (!acc[SystemName][TypedefName]) acc[SystemName][TypedefName] = [];

      acc[SystemName][TypedefName].push({
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
    <Form layout="vertical">
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item label="Relation Type">
            <TreeSelect
              showSearch
              style={{ width: "100%" }}
              value={typedefValue}
              placeholder="Select a typedef"
              treeData={typedefTreeData}
              allowClear
              treeLine={true}
              onSearch={setSearchText}
              onChange={setTypedefValue}
              treeIcon={true}
              filterTreeNode={(input, node) =>
                node.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={4}>
          <Form.Item label="Use Report">
            <Checkbox onChange={(e) => setIsReportEnabled(e.target.checked)} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Report">
            <TreeSelect
              showSearch
              style={{ width: "100%" }}
              value={reportValue}
              placeholder="Select a report"
              treeData={reportTreeData}
              allowClear
              treeIcon={true}
              disabled={!isReportEnabled}
              onSearch={setReportSearchText}
              treeLine={true}
              onChange={setReportValue}
              filterTreeNode={(input, node) =>
                node.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} md={6}>
          <Form.Item label="Include Relationship">
            <Checkbox />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item label="One to One">
            <Checkbox />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item label="Allow New">
            <Checkbox />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item label="Allow Edit">
            <Checkbox />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default R1NSettings;
