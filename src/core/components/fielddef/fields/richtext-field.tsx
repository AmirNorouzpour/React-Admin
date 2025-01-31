import React, { useState } from "react";
import { Form, Checkbox, Row, Col, InputNumber, Select, Input } from "antd";

const RichTextSettings: React.FC = () => {
  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item name="hasMedia">
            <Checkbox>Can Insert Media</Checkbox>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="simpleToolbar">
            <Checkbox>Simple Toolbar</Checkbox>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default RichTextSettings;
