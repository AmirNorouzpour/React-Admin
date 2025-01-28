import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  Checkbox,
  Row,
  Col,
  Divider,
  Select,
  Button,
} from "antd";
import TextSettings from "./fields/text-settings.tsx";
import NumberSettings from "./fields/number-settings.tsx";
import DatetimeSettings from "./fields/datetime-settings.tsx";
import BooleanSettings from "./fields/boolean-settings.tsx";
import EnumSettings from "./fields/enum-settings.tsx";
import { FieldType } from "../../models/field-type.ts";
import RichTextSettings from "./fields/richtext-field.tsx";
import FilesListSettings from "./fields/filelist-field.tsx";
import PictureSettings from "./fields/picture-field.tsx";
import JsonSettings from "./fields/json-field.tsx";
import R1NSettings from "./fields/R1N/r1n-field.tsx";
import RNNSettings from "./fields/RNN/rnn-field.tsx";

const FieldDefForm: React.FC = () => {
  const [form] = Form.useForm();
  const [fieldType, setFieldType] = useState<FieldType>(FieldType.Text);
  const { TextArea } = Input;

  const renderDynamicContent = () => {
    switch (fieldType) {
      case FieldType.Text:
        return <TextSettings />;
      case FieldType.Number:
        return <NumberSettings />;
      case FieldType.RichText:
        return <RichTextSettings />;
      case FieldType.DateTime:
        return <DatetimeSettings />;
      case FieldType.Boolean:
        return <BooleanSettings />;
      case FieldType.R1N:
        return <R1NSettings />;
      case FieldType.RNN:
        return <RNNSettings />;
      case FieldType.Enum:
        return <EnumSettings />;
      case FieldType.FileList:
        return <FilesListSettings />;
      case FieldType.Picture:
        return <PictureSettings />;
      case FieldType.Json:
        return <JsonSettings />;
      case FieldType.Object:
        return <div>Object Settings</div>;
      case FieldType.Report:
        return <div>Report Settings</div>;
      default:
        return <div>Please select a field type</div>;
    }
  };

  const onFinish = (fieldDef: any) => {
    debugger;
    console.log("Form submitted with values:", fieldDef);
  };

  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{ fieldType: fieldType }}
      >
        <Row gutter={8}>
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
                      { label: <span>Text</span>, value: FieldType.Text },
                      { label: <span>Number</span>, value: FieldType.Number },
                      {
                        label: <span>DateTime</span>,
                        value: FieldType.DateTime,
                      },
                      { label: <span>Boolean</span>, value: FieldType.Boolean },
                      { label: <span>Enum</span>, value: FieldType.Enum },
                    ],
                  },
                  {
                    label: <span>Relations</span>,
                    title: "Relations",
                    options: [
                      { label: <span>R1N</span>, value: FieldType.R1N },
                      { label: <span>RNN</span>, value: FieldType.RNN },
                    ],
                  },
                  {
                    label: <span>Advanced</span>,
                    title: "advanced",
                    options: [
                      {
                        label: <span>RichText</span>,
                        value: FieldType.RichText,
                      },
                      {
                        label: <span>FileList</span>,
                        value: FieldType.FileList,
                      },
                      { label: <span>Picture</span>, value: FieldType.Picture },
                      { label: <span>Report</span>, value: FieldType.Report },
                      { label: <span>Json</span>, value: FieldType.Json },
                    ],
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
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
        <Row gutter={8}>
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

        <Divider orientation="left" style={{ borderColor: "#128bed" }}>
          {`${FieldType[fieldType]} Field Settings`}
        </Divider>
        {renderDynamicContent()}

        {/* Submit Button */}
        <Row>
          <Col>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FieldDefForm;
