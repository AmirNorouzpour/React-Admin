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

interface UserFormData {
  fullname: string;
  username: string;
  password?: string;
  rePassword?: string;
  canLogin?: boolean;
  systems: [];
}

interface SystemOption {
  label: string;
  value: string;
}

const TypedefForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const { selectedKey } = location.state || {};
  const [systemOptions, setSystemOptions] = useState<SystemOption[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (selectedKey) {
      const fetchUserData = async () => {
        try {
          const userData = await getRequest<UserFormData>(
            `/api/typedef/${selectedKey}`
          );
          form.setFieldsValue(userData.data);
        } catch (error: any) {
          messageApi.error("Failed to fetch user data");
        }
      };

      fetchUserData();
      fetchSystems("");
    }
  }, [selectedKey, form, messageApi]);

  const onChange = (key: string) => {
    console.log(key);
  };

  const fetchSystems = async (searchText: string) => {
    try {
      setSearchLoading(true);
      debugger;
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

  const onFinish = async (values: UserFormData) => {
    try {
      if (selectedKey) {
        const data = { id: selectedKey, ...values };
        await postRequest(`/api/users`, data);
        messageApi.success("User updated successfully!");
      } else {
        await postRequest<UserFormData>("/api/users", values);
        messageApi.success("User created successfully!");
      }
      navigate("/user");
    } catch (error: any) {
      messageApi.error(error.message || "An error occurred");
    }
  };

  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: "Fields",
      children: <TypedefFields />,
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
    if (id === 2) {
      navigate("/user");
    } else {
      form.submit();
    }
  };

  return (
    <div>
      {contextHolder}

      <Card
        title={selectedKey ? "Edit Typedef" : "New Typedef"}
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
                <Input placeholder="Full Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={5}>
              <Form.Item
                label="System"
                name="system"
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
