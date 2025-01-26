import React from "react";
import { Form, Input, Checkbox, Row, Col, InputNumber } from "antd";

const TextSettings: React.FC = () => {
  return (
    <div>
      <Form layout="vertical">
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item label="Place Holder" name="placeHolder">
              <Input placeholder="Place Holder" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Regex Mask" name="regex">
              <Input placeholder="Regex Mask" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Translation Key" name="translationKey">
              <Input placeholder="Translation Key" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={4}>
            <Form.Item label="Min Length" name="minLength">
              <InputNumber min={1} placeholder="Min > 0" />
            </Form.Item>
          </Col>
          <Col xs={24} md={4}>
            <Form.Item label="Max Length" name="maxLength">
              <InputNumber min={1} placeholder="Max > 0" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="hasSuggtions">
              <Checkbox>Use Data for Suggtions</Checkbox>
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="multiLine">
              <Checkbox>Multi Line</Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TextSettings;
