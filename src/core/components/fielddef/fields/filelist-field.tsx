import React, { useState } from "react";
import { Form, Checkbox, Row, Col, InputNumber, Select, Input } from "antd";

const FilesListSettings: React.FC = () => {
  const [calendar, setDataType] = useState<string>("1");
  const [dateFormat, setDateFormat] = useState<string>("6");
  const [timeFormat, setTimeFormat] = useState<string>("2");
  return (
    <Form
      layout="vertical"
      initialValues={{
        calendar: calendar,
        dateFormat: dateFormat,
        timeFormat: timeFormat,
      }}
    >
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item label="type" name="type">
            <Select
              placeholder="Please choose the type"
              onChange={(value) => setDataType(value)}
              options={[
                { label: <span>Multiple List</span>, value: "1" },
                { label: <span>Single File</span>, value: "2" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item label="Max File Count" name="count">
            <InputNumber
              placeholder="Max File Count"
              style={{ width: "100%" }}
              min={0}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item label="Max File Size (KB)" name="size">
            <InputNumber
              min={0}
              placeholder="Max File Size"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} md={18}>
          <Form.Item
            label="Allowed Extensions Seprate with Commas (,)"
            name="exts"
          >
            <Input placeholder="PDF,PNG,JPEG,JPG,GIF,ICO,DOCX ..." />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item label="Show Extension" name="showExt">
            <Checkbox></Checkbox>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default FilesListSettings;
