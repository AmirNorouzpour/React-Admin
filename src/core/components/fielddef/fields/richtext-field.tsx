import React, { useState } from "react";
import { Form, Checkbox, Row, Col, InputNumber, Select, Input } from "antd";

const RichTextSettings: React.FC = () => {
  return (
    <Row gutter={16}>
      <Col xs={24} md={12}>
        <Form.Item name="hasMedia" valuePropName="checked">
          <Checkbox>Can Insert Media</Checkbox>
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item name="simpleToolbar" valuePropName="checked">
          <Checkbox>Simple Toolbar</Checkbox>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default RichTextSettings;
