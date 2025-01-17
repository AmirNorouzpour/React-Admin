import Toolbar from "../toolbar/toolbar.tsx";
import "./org-form.css";
import React, { useState } from "react";
import { Card, Form, message, Input, Radio } from "antd";
import { useNavigate } from "react-router-dom";

const buttonData = [
  { id: 1, label: "Save", type: "primary" },
  { id: 2, label: "Cancel" },
];
const OrgForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const handleButtonClick = (label: string, id: number) => {
    if (id === 1) {
      messageApi
        .open({
          type: "success",
          content: "This is a success message",
        })
        .then(() => {
          navigate("/org-chart");
        });
    }
    if (id === 2) {
      navigate("/org-chart");
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
        <Form layout="vertical" form={form} style={{ maxWidth: 600 }}>
          <Form.Item label="">
            <Radio.Group defaultValue="department" size="small">
              <Radio.Button style={{ fontSize: "12px" }} value="department">
                Department
              </Radio.Button>
              <Radio.Button style={{ fontSize: "12px" }} value="position">
                Position
              </Radio.Button>
            </Radio.Group>{" "}
          </Form.Item>
          <Form.Item label="Name">
            <Input placeholder="Name " />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default OrgForm;
