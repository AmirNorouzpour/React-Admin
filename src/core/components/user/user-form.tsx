import React, { useEffect, useState } from "react";
import {
  Card,
  Form,
  message,
  Input,
  Checkbox,
  Row,
  Col,
  Transfer,
  TransferProps,
} from "antd";
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
  systems: [];
}

const UserForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const { selectedKey } = location.state || {};
  const [systems, setSystems] = useState<System[]>([]);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  useEffect(() => {
    if (selectedKey) {
      const fetchUserData = async () => {
        try {
          const userData = await getRequest<UserFormData>(
            `/api/users/${selectedKey}`
          );

          // تنظیم مقادیر فرم
          form.setFieldsValue(userData.data);

          // ایجاد آرایه با ویژگی key
          const formattedSystems = userData.data.systems.map((item: any) => ({
            key: item.key, // فرض بر این که `id` شناسه منحصربه‌فرد است
            name: item.name,
            chosen: item.chosen,
          }));

          setSystems(formattedSystems);

          // تنظیم targetKeys برای موارد انتخاب‌شده
          setTargetKeys(
            formattedSystems
              .filter((item: any) => item.chosen)
              .map((item: any) => item.key)
          );
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
        var data = { id: selectedKey, ...values, systems: targetKeys };
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

  const handleButtonClick = (label: string, id: number) => {
    if (id === 2) {
      navigate("/user");
    } else {
      form.submit();
    }
  };

  const handleChange: TransferProps["onChange"] = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
  };

  interface System {
    key: string;
    name: string;
    chosen: boolean;
  }

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
            <Col xs={24} md={5}>
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
            <Col xs={24} md={5}>
              <Form.Item
                label="User Name"
                name="username"
                rules={[
                  { required: true, message: "Please input the user name" },
                ]}
              >
                <Input placeholder="User Name" />
              </Form.Item>
            </Col>

            {selectedKey == null && (
              <Col xs={24} md={5}>
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
            )}

            {selectedKey == null && (
              <Col xs={24} md={5}>
                <Form.Item
                  label="Re Password"
                  name="rePassword"
                  rules={[
                    {
                      required: true,
                      message: "Please input the Re Password",
                    },
                  ]}
                >
                  <Input placeholder="Re Password" type="password" />
                </Form.Item>
              </Col>
            )}
            <Col xs={24} md={4}>
              <Form.Item
                name="canLogin"
                label="Can login"
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {selectedKey != null && (
        <Card title={"User Systems"} type="inner" style={{ marginTop: "20px" }}>
          <Row gutter={16}>
            <Col xs={24} md={24}>
              <Transfer
                titles={["Can", "Have"]}
                dataSource={systems}
                showSearch
                // filterOption={filterOption}
                targetKeys={targetKeys}
                onChange={handleChange}
                // onSearch={handleSearch}
                render={(item) => item.name}
                style={{ width: "100%" }}
                listStyle={{
                  width: "48%",
                  minWidth: "100px",
                }}
              />
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
};

export default UserForm;
