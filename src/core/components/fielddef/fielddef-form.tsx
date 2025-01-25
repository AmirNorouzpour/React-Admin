import React, { useState } from "react";
import { Card, Form, Input, Checkbox, Row, Col, Divider, Select } from "antd";
import TextSettings from "./fields/text-settings.tsx";
import NumberSettings from "./fields/number-settings.tsx";
import DatetimeSettings from "./fields/datetime-settings.tsx";
import BooleanSettings from "./fields/boolean-settings.tsx";
import EnumSettings from "./fields/enum-settings.tsx";

const FieldDefForm: React.FC = () => {
  const [form] = Form.useForm();
  const [fieldType, setFieldType] = useState<string>("1");
  const { TextArea } = Input;

  const renderDynamicContent = () => {
    switch (fieldType) {
      case "1": // Text
        return <TextSettings />;
      case "2": // Number
        return <NumberSettings />;
      case "3": // RichText
        return <TextArea rows={4} placeholder="maxLength is 6" />;
      case "4": // Date
        return <DatetimeSettings />;
      case "5": // Boolean
        return <BooleanSettings />;
      case "6": // File
        return <Input type="file" />;
      case "7": // R1N
        return <div>Relation One to Many (R1N)</div>;
      case "8": // RNN
        return <div>Relation Many to Many (RNN)</div>;
      case "9":
        return <EnumSettings />;
      default:
        return <div>Please select a field type</div>;
    }
  };

  return (
    <div>
      <Form layout="horizontal" initialValues={{ fieldType: fieldType }}>
        <Row gutter={[8, 8]}>
          <Col span={8}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input placeholder="Please enter name" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please enter title" }]}
            >
              <Input placeholder="Please enter title" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="fieldType"
              label="Type"
              rules={[{ required: true, message: "Please choose the type" }]}
            >
              <Select
                placeholder="Please choose the type"
                onChange={(value) => setFieldType(value)}
                options={[
                  {
                    label: <span>Primitives</span>,
                    title: "Primitives",
                    options: [
                      { label: <span>Text</span>, value: "1" },
                      { label: <span>Number</span>, value: "2" },
                      { label: <span>DateTime</span>, value: "4" },
                      { label: <span>Boolean</span>, value: "5" },
                      { label: <span>Enum</span>, value: "9" },
                    ],
                  },
                  {
                    label: <span>Relations</span>,
                    title: "Relations",
                    options: [
                      { label: <span>R1N</span>, value: "7" },
                      { label: <span>RNN</span>, value: "8" },
                    ],
                  },
                  {
                    label: <span>Advanced</span>,
                    title: "advanced",
                    options: [
                      { label: <span>RichText</span>, value: "3" },
                      { label: <span>File</span>, value: "6" },
                    ],
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item name="isUnique">
              <Checkbox>Is Unique</Checkbox>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="nonEditable">
              <Checkbox>Non-Editable</Checkbox>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="readOnlyFromDb">
              <Checkbox>Read Only From DB</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item name="notNull">
              <Checkbox>Not null or empty</Checkbox>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="encrypted">
              <Checkbox>Encrypted</Checkbox>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="rtl">
              <Checkbox>Is RTL</Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Divider orientation="left" style={{ borderColor: "#128bed" }}>
        {`${fieldType} Field Settings`}
      </Divider>
      <Row>
        <Col span={24}>
          {/* <Card size="small" type="inner"> */}
          {renderDynamicContent()}
          {/* </Card> */}
        </Col>
      </Row>
    </div>
  );
};

export default FieldDefForm;
