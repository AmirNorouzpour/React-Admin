import React, { useEffect, useState } from "react";
import { Form, Row, Col, TreeSelect, Checkbox, Select } from "antd";
import { getRequest } from "../../../../services/apiService.ts";

const RNNSettings: React.FC = () => {
  const [treeData, setTreeData] = useState<[]>([]);
  const [relType, setRelType] = useState<Number>(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [reportOptions, setReportOptions] = useState<[]>([]);
  const [value, setValue] = useState<string | undefined>(undefined);
  const [hasReport, setHasReport] = useState(false);
  useEffect(() => {
    fetchTypedefs("");
    fetchReports("");
  }, []);
  const onSearch = (value: string) => {
    fetchTypedefs(value);
  };

  const onHasReprotChange = (e) => {
    setHasReport(e.target.checked);
  };

  const onReportSearch = (value: string) => {
    fetchReports(value);
  };

  const fetchReports = async (searchText: string) => {
    try {
      let params = { filters: "" };
      let cnds = { rules: [], condition: "and" };
      params.reportId = "1e45d3d0-1639-4140-8e53-3d6fe6855b24";

      cnds.rules.push({
        field: "Name",
        operator: "like",
        value: searchText,
        entity: "Typedefs",
      });
      params.filters = JSON.stringify(cnds);

      const queryString = new URLSearchParams(params).toString();
      const response = await getRequest<[]>(`/api/generic?${queryString}`);
      setReportOptions(
        response.data.map((item) => ({
          label: item.Name,
          value: item.Id,
        }))
      );
    } catch (error: any) {}
  };

  const fetchTypedefs = async (searchText: string) => {
    try {
      let params = { filters: "" };
      let cnds = { rules: [], condition: "and" };
      params.reportId = "5BFD40B1-63FE-46A4-AB58-104A1CF9680A";

      cnds.rules.push({
        field: "Name",
        operator: "like",
        value: searchText,
        entity: "Typedefs",
      });
      params.filters = JSON.stringify(cnds);

      const queryString = new URLSearchParams(params).toString();
      const response = await getRequest<[]>(`/api/generic?${queryString}`);
      const tree = transformDataToTree(response.data);
      tree.push({
        label: "General",
        value: "0",
        children: [
          { label: "Create New TypeDef", value: "1", children: [] },
          { label: "General Object", value: "2", children: [] },
        ],
        selectable: false,
      });
      setTreeData(tree);
    } catch (error: any) {}
  };

  function transformDataToTree(data: any[]): [] {
    const groupedData: { [key] } = {};

    data.forEach((item) => {
      const systemId = item.SystemId;
      if (!groupedData[systemId]) {
        groupedData[systemId] = {
          label: item.SystemName,
          value: systemId,
          children: [],
          selectable: false,
        };
      }

      groupedData[systemId].children.push({
        label: item.Name,
        value: item.Id,
        children: [],
      });
    });

    return Object.values(groupedData);
  }

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  return (
    <Form layout="vertical" initialValues={{}}>
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item label="Relation Type" name="relationType">
            <TreeSelect
              showSearch
              style={{ width: "100%" }}
              //   value={value}
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              allowClear
              treeDefaultExpandAll
              placeholder="Select an item"
              onSearch={onSearch}
              onChange={handleChange}
              treeLine={true}
              treeIcon={true}
              treeData={treeData}
              treeDataSimpleMode={false}
              filterTreeNode={(inputValue, treeNode) =>
                treeNode.label.toLowerCase().includes(inputValue.toLowerCase())
              }
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={4}>
          <Form.Item label="Use Report" name="hasReport">
            <Checkbox onChange={onHasReprotChange} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Report" name="report">
            <Select
              disabled={!hasReport}
              showSearch
              placeholder="Search and select a report"
              filterOption={false}
              onSearch={onReportSearch}
              options={reportOptions}
              loading={searchLoading}
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} md={24}>
          <Form.Item label="Relation type" name="relType">
            <Select
              placeholder="Please choose the Relation type"
              onChange={(value) => setRelType(value)}
              options={[
                { label: <span>Is Include</span>, value: 1 },
                { label: <span>Is Related</span>, value: 2 },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default RNNSettings;
