import React, { useEffect, useState } from "react";
import {
  Card,
  Form,
  message,
  Input,
  Row,
  Col,
  Select,
  Tabs,
  TabsProps,
  TreeSelect,
} from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import Toolbar from "../toolbar/toolbar.tsx";
import { postRequest, getRequest } from "../../services/apiService.ts";
import { AppstoreOutlined, DatabaseOutlined } from "@ant-design/icons";

const buttonData = [
  { id: 1, label: "Save", type: "primary" },
  { id: 2, label: "Cancel", type: "default" },
];

interface SystemOption {
  label: string;
  value: string;
}

const ReportBuilder: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const { selectedKey: selectedReportId } = location.state || {};
  const [systemOptions, setSystemOptions] = useState<SystemOption[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [typedefValue, setTypedefValue] = useState<string | undefined>(
    undefined
  );
  const [typedefTreeData, setTypedefTreeData] = useState<[]>([]);
  //=======================================
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (selectedReportId) {
      fetchData();
    }
    fetchSystems("");
    loadTypedefData("");
  }, [selectedReportId, form, messageApi]);

  const loadTypedefData = async (searchText: string) => {
    try {
      const params = createQueryParams(
        "5BFD40B1-63FE-46A4-AB58-104A1CF9680A",
        searchText
      );
      const response = await getRequest<[]>(`/api/generic?${params}`);
      const tree = transformTypedefData(response.data);
      debugger;
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

  const onChange = (key: string) => {
    console.log(key);
  };

  const fetchData = async () => {
    try {
      const data = await getRequest<any>(
        `/api/base/report/${selectedReportId}`
      );
      form.setFieldsValue(data.data);
      setFields(data.data.fields);
    } catch (error: any) {
      messageApi.error("Failed to fetch report data");
    }
  };

  const fetchSystems = async (searchText: string) => {
    try {
      setSearchLoading(true);
      let params = { filters: "" };
      let cnds = { rules: [], condition: "and" };
      params.reportId = "0a031c92-a079-4964-954b-deefe3ba04a2";

      cnds.rules.push({
        field: "Name",
        operator: "like",
        value: searchText,
        entity: "Systems",
      });
      params.filters = JSON.stringify(cnds);

      const queryString = new URLSearchParams(params).toString();
      const response = await getRequest<[]>(`/api/generic?${queryString}`);
      setSystemOptions(
        response.data.map((system) => ({
          label: system.Name,
          value: system.Id,
        }))
      );
    } catch (error: any) {
      messageApi.error("Failed to fetch systems");
    } finally {
      setSearchLoading(false);
    }
  };

  const onSearch = (value: string) => {
    fetchSystems(value);
  };

  const onFinish = async (values: any) => {
    try {
      let data;
      if (selectedReportId)
        data = { id: selectedReportId, ...values, fields: fields };
      else data = { ...values, fields: fields };
      var res = await postRequest(`/api/base/report`, data);
      messageApi.success("data updated successfully!");
      navigate("", { state: { selectedKey: res.data.id } });
    } catch (error: any) {
      messageApi.error(error.message || "An error occurred");
    }
  };

  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: "Details",
      children: <div>Details</div>,
    },
    {
      key: "2",
      label: "Coulmns",
      children: <div>Coulmns</div>,
    },
    {
      key: "3",
      label: "Conditions",
      children: <div>Conditions</div>,
    },
    {
      key: "4",
      label: "Styles",
      children: "Content of Tab Pane 4",
    },
    {
      key: "5",
      label: "Settings",
      children: "Content of Settings",
    },
  ];

  const handleButtonClick = (label: string, id: number) => {
    if (id === 1) {
      form.submit();
    } else {
      navigate("/system-management/typedef");
    }
  };

  return (
    <div>
      {contextHolder}

      <Card
        title={selectedReportId ? "Edit Report" : "New Report"}
        type="inner"
        extra={
          <Toolbar buttonData={buttonData} onButtonClick={handleButtonClick} />
        }
      >
        <Form
          layout="vertical"
          form={form}
          style={{ maxWidth: 1400 }}
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col xs={24} md={6}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input the name" }]}
              >
                <Input placeholder="Name" disabled={selectedReportId} />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                label="TypeDef"
                name="typedefId"
                rules={[
                  { required: true, message: "Please select the TypeDef" },
                ]}
              >
                <TreeSelect
                  showSearch
                  style={{ width: "100%" }}
                  value={typedefValue}
                  placeholder="Select a typedef"
                  treeData={typedefTreeData}
                  allowClear
                  treeLine={true}
                  onChange={setTypedefValue}
                  treeIcon={true}
                  filterTreeNode={(input, node) =>
                    node.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                label="Type"
                name="type"
                rules={[
                  { required: true, message: "Please select the Report Type" },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Search and select  Report Type"
                  options={[
                    { label: "List", value: "1" },
                    { label: "Tree", value: "2" },
                    { label: "Printable", value: "3" },
                    { label: "Ghraph", value: "4" },
                    { label: "Dashborad", value: "5" },
                  ]}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                label="System"
                name="systemId"
                rules={[
                  { required: true, message: "Please select the System" },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Search and select a system"
                  filterOption={false}
                  onSearch={onSearch}
                  options={systemOptions}
                  loading={searchLoading}
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Tabs size="small" onChange={onChange} type="card" items={tabs} />
      </Card>
    </div>
  );
};

export default ReportBuilder;
