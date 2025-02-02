import React, { useState } from "react";
import { Form, Checkbox, Row, Col, InputNumber, Select, Input } from "antd";

const JsonSettings: React.FC = () => {
  return (
    <Row gutter={16}>
      <Col xs={24} md={6}>
        <Form.Item
          name="showDataTypes"
          label="Display Data Types"
          valuePropName="checked"
        >
          <Checkbox></Checkbox>
        </Form.Item>
      </Col>
      <Col xs={24} md={6}>
        <Form.Item
          name="showItemsSize"
          label="Display Items Size"
          valuePropName="checked"
        >
          <Checkbox></Checkbox>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default JsonSettings;
