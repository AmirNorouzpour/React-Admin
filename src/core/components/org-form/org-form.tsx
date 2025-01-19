import React from "react";
import { Card, Form, message, Input, Radio } from "antd";
import { useNavigate, useLocation } from "react-router-dom"; // اضافه کردن useLocation
import Toolbar from "../toolbar/toolbar.tsx";
import { postRequest } from "../../services/apiService.ts";
import "./org-form.css";

const buttonData = [
  { id: 1, label: "Save", type: "primary" },
  { id: 2, label: "Cancel", type: "default" },
];

interface OrgFormData {
  type: string;
  name: string;
  parentKey?: string; // اضافه کردن parentKey
}

const OrgForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation(); // استفاده از useLocation برای گرفتن state
  const { selectedKey } = location.state || {}; // گرفتن selectedKey از state

  const onFinish = async (values: OrgFormData) => {
    try {
      const dataToSend = { ...values, parent: selectedKey };
      await postRequest<OrgFormData>("/org", dataToSend);
      messageApi.success("Data saved successfully!");
      navigate("/org-chart");
    } catch (error: any) {
      messageApi.error(error.message || "An error occurred");
    }
  };

  const handleButtonClick = (label: string, id: number) => {
    if (id === 2) {
      navigate("/org-chart");
    } else {
      form.submit();
    }
  };

  return (
    <div>
      {contextHolder}

      <Card
        title="Organization Chart Form"
        type="inner"
        extra={
          <Toolbar buttonData={buttonData} onButtonClick={handleButtonClick} />
        }
      >
        <Form
          layout="vertical"
          form={form}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Type"
            name="type"
            initialValue="department"
            rules={[{ required: true, message: "Please select a type" }]}
          >
            <Radio.Group size="small">
              <Radio.Button style={{ fontSize: "12px" }} value="department">
                Department
              </Radio.Button>
              <Radio.Button style={{ fontSize: "12px" }} value="position">
                Position
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the name" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default OrgForm;
