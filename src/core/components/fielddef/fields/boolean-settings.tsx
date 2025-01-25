import React, { useState } from "react";
import { Form, Checkbox, Row, Col, InputNumber, Select, Input } from "antd";

const BooleanSettings: React.FC = () => {
  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item label="'True' Label" name="trueLabel">
            <Input placeholder="True" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="'False' Label" name="falseLabel">
            <Input placeholder="False" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default BooleanSettings;
