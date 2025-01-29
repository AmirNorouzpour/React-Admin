import React, { useState } from "react";
import { Form, Checkbox, Row, Col, InputNumber, Select } from "antd";

const NumberSettings: React.FC = () => {
  const [dataType, setDataType] = useState<string>("1");
  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item label="Min Length" name="minLength">
            <InputNumber placeholder="Min Length" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item label="Max Length" name="maxLength">
            <InputNumber placeholder="Max Length" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item name="thousandsSeparator">
            <Checkbox>Thousands Separator</Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item label="Data Type" name="dataType">
            <Select
              placeholder="Please choose the data type"
              onChange={(value) => setDataType(value)}
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
