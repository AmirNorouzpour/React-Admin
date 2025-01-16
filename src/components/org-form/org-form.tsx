import Toolbar from "../toolbar/toolbar.tsx";
import "./org-form.css";
import React, { useState } from "react";
import { Button, Form, Input, Radio } from "antd";

const buttonData = [{ id: 1, label: "Save", type: "default" }];
const OrgChart: React.FC = () => {
  const [form] = Form.useForm();
  return (
    <div>
      <Toolbar buttonData={buttonData} />

      <Form layout="vertical" form={form} style={{ maxWidth: 600 }}>
        <Form.Item label="Field A">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Field B">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrgChart;
