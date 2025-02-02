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
} from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import Toolbar from "../toolbar/toolbar.tsx";
import { postRequest, getRequest } from "../../services/apiService.ts";
import TypedefFields from "./typedef-fields.tsx";
import TypedefActions from "./typedef-actions.tsx";
import TypedefSettings from "./typedef-settings.tsx";

const buttonData = [
  { id: 1, label: "Save", type: "primary" },
  { id: 2, label: "Cancel", type: "default" },
];

interface SystemOption {
  label: string;
  value: string;
}

const TypedefForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const { selectedKey: selectedTypeDefId } = location.state || {};
  const [systemOptions, setSystemOptions] = useState<SystemOption[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  //=======================================
  const [fields, setFields] = useState([]);

  useEffect(() => {
    if (selectedTypeDefId) {
      fetchData();
    }
    fetchSystems("");
  }, [selectedTypeDefId, form, messageApi]);

  const onChange = (key: string) => {
    console.log(key);
  };

  const fetchData = async () => {
    try {
      const data = await getRequest<any>(
        `/api/base/typedef/${selectedTypeDefId}`
      );
      form.setFieldsValue(data.data);
      setFields(data.data.fields);
    } catch (error: any) {
      messageApi.error("Failed to fetch typedef data");
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
      if (selectedTypeDefId)
        data = { id: selectedTypeDefId, ...values, fields: fields };
      else data = { ...values, fields: fields };
      var res = await postRequest(`/api/base/typedef`, data);
      messageApi.success("data updated successfully!");
      fetchData();
    } catch (error: any) {
      messageApi.error(error.message || "An error occurred");
    }
  };

  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: "Fields",
      children: (
        <TypedefFields
          typedefId={selectedTypeDefId}
          fields={fields}
          setFields={setFields}
        />
      ),
    },
    {
      key: "2",
      label: "Actions",
      children: <TypedefActions />,
    },
    {
      key: "3",
      label: "Settings",
      children: <TypedefSettings />,
    },
    {
      key: "4",
      label: "Business Rules",
      children: "Content of Tab Pane 4",
    },
    {
      key: "5",
      label: "Authorization",
      children: "Content of Tab Pane 5",
    },
    {
      key: "6",
      label: "Views",
      children: "List of Views",
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
        title={selectedTypeDefId ? "Edit Typedef" : "New Typedef"}
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
            <Col xs={24} md={5}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input the name" }]}
              >
                <Input placeholder="Full Name" disabled={selectedTypeDefId} />
              </Form.Item>
            </Col>
            <Col xs={24} md={5}>
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

export default TypedefForm;
