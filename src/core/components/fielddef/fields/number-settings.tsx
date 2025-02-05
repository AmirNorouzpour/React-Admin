import React, { useState } from "react";
import { Form, Checkbox, Row, Col, InputNumber, Select } from "antd";

const NumberSettings: React.FC = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item label="Min" name="min">
            <InputNumber placeholder="Min" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item label="Max" name="max">
            <InputNumber placeholder="Max" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Thousands Separator"
            name="thousandsSeparator"
            valuePropName="checked"
          >
            <Checkbox></Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item
            initialValue={"1"}
            label="Data Type"
            name="dataType"
            rules={[{ required: true, message: "Please choose the data type" }]}
          >
            <Select
              placeholder="Please choose the data type"
              options={[
                { label: <span>Integer</span>, value: "1" },
                { label: <span>Double</span>, value: "2" },
                { label: <span>Decimal</span>, value: "3" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item label="Decimals" name="decimals">
            <InputNumber
              placeholder="Decimals"
              style={{ width: "100%" }}
              min={0}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default NumberSettings;
