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
  key: string;
  type: string;
  name: string;
  parentKey?: string; // اضافه کردن parentKey
}

const OrgForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const { key, parent } = location.state || {};

  const onFinish = async (values: OrgFormData) => {
    try {
      const dataToSend = { ...values, parent: parent };
      await postRequest<OrgFormData>("/org", dataToSend);
      messageApi.success("Data saved successfully!");
      navigate("/org-chart");
    } catch (error: any) {
      messageApi.error(error.message || "An error occurred");
    }
  };

  const handleButtonClick = (label: string, id: number) => {
    var a = key;
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
            initialValue={1}
            rules={[{ required: true, message: "Please select a type" }]}
          >
            <Radio.Group size="small">
              <Radio.Button style={{ fontSize: "12px" }} value={1}>
                Department
              </Radio.Button>
              <Radio.Button style={{ fontSize: "12px" }} value={2}>
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
