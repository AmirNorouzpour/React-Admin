import React, { useState } from "react";
import { Form, Checkbox, Row, Col, InputNumber, Select, Input } from "antd";

const JsonSettings: React.FC = () => {
  return (
    <Row gutter={16}>
      <Col xs={24} md={24}>
        <Form.Item name="className" label="Class name">
          <Input placeholder="Namespace and Class name for deserialize" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default JsonSettings;
