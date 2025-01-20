import React, { useEffect } from "react";
import { Card, Form, message, Input, Checkbox, Row, Col } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import Toolbar from "../toolbar/toolbar.tsx";
import { postRequest, getRequest } from "../../services/apiService.ts";

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
}

const UserForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const { selectedKey } = location.state || {};

  useEffect(() => {
    if (selectedKey) {
      const fetchUserData = async () => {
        try {
          const userData = await getRequest<UserFormData>(
            `/api/users/${selectedKey}`
          );
          form.setFieldsValue(userData.data); // تنظیم مقادیر فرم
        } catch (error: any) {
          messageApi.error("Failed to fetch user data");
        }
      };

      fetchUserData();
    }
  }, [selectedKey, form, messageApi]);

  const onFinish = async (values: UserFormData) => {
    try {
      if (selectedKey) {
        await postRequest(`/api/users/${selectedKey}`, values);
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
        title={selectedKey ? "Edit User Info" : "New User Info"}
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
                label="Full Name"
                name="fullname"
                rules={[
                  { required: true, message: "Please input the full name" },
                ]}
              >
                <Input placeholder="Full Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                label="User Name"
                name="userName"
                rules={[
                  { required: true, message: "Please input the user name" },
                ]}
              >
                <Input placeholder="User Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input the password" },
                ]}
              >
                <Input placeholder="Password" type="password" />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                label="Re Password"
                name="rePassword"
                rules={[
                  { required: true, message: "Please input the Re Password" },
                ]}
              >
                <Input placeholder="Re Password" type="password" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={6}>
              <Form.Item
                name="canLogin"
                valuePropName="checked" // تنظیم برای چک‌باکس
              >
                <Checkbox>Can Login</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default UserForm;
