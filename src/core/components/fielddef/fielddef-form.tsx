import React, { useEffect, useState } from "react";
import { Card, Form, Input, Checkbox, Row, Col, Divider, Select } from "antd";
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
import Toolbar from "../toolbar/toolbar.tsx";
import buttonData from "../../models/button-data.ts";

const buttons: buttonData[] = [
  { id: 1, label: "Save", type: "primary" },
  { id: 2, label: "Save And New", type: "primary" },
  { id: 3, label: "Cancel", type: "danger" },
];

interface FieldDefFormProps {
  onFieldDefSave: (newFieldDef: any, close: boolean) => void;
  onFieldDefCancel: () => void;
  field: {};
}
const FieldDefForm: React.FC<FieldDefFormProps> = ({
  onFieldDefSave,
  onFieldDefCancel,
  field,
}) => {
  const [form] = Form.useForm();
  const [type, setFieldType] = useState<FieldType>(FieldType.Text);
  const [close, setClose] = useState(false);

  useEffect(() => {
    var data = reverseTransformData(field);
    setFieldType(data.type);
    renderDynamicContent();
    form.setFieldsValue({ ...data });
  }, [field]);

  function reverseTransformData(input) {
    let output = {
      name: input.name,
      title: input.title,
      type: input.type,
      items: input.items || [],
    };

    let settings = JSON.parse(input.settings || "{}");

    for (let key in settings) {
      output[key] = settings[key];
    }

    return output;
  }

  const renderDynamicContent = () => {
    switch (type) {
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
    fieldDef.id = field.id;
    if (type === FieldType.Enum) {
    }
    onFieldDefSave(fieldDef, close);
    form.resetFields();
  };

  const handleToolbarClick = (label: string, id: number) => {
    if (id === 1) {
      setClose(true);
      form.submit();
    }
    if (id === 2) {
      setClose(false);
      form.submit();
    }
    if (id === 3) {
      onFieldDefCancel();
    }
  };

  return (
    <div>
      <Card
        title="Field Def"
        type="inner"
        extra={
          <Toolbar buttonData={buttons} onButtonClick={handleToolbarClick} />
        }
      >
        <Form
          layout="vertical"
          form={form}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input
                  placeholder="Please enter name"
                  disabled={field?.id != null}
                />
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
                name="type"
                label="Type"
                rules={[{ required: true, message: "Please choose the type" }]}
              >
                <Select
                  placeholder="Please choose the type"
                  onChange={(value) => setFieldType(value)}
                  disabled={field?.id != null}
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
                        {
                          label: <span>Boolean</span>,
                          value: FieldType.Boolean,
                        },
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
                        {
                          label: <span>Picture</span>,
                          value: FieldType.Picture,
                        },
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
              <Form.Item name="isUnique" valuePropName="checked">
                <Checkbox>Is Unique</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="nonEditable" valuePropName="checked">
                <Checkbox>Non-Editable</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item valuePropName="checked" name="readonlyfromdb">
                <Checkbox>Read Only From DB</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item valuePropName="checked" name="notnull">
                <Checkbox>Not null or empty</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item valuePropName="checked" name="encrypted">
                <Checkbox>Encrypted</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="rtl" valuePropName="checked">
                <Checkbox>Is RTL</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <Form.Item name="isFx" valuePropName="checked">
                <Checkbox>Is Fx</Checkbox>
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item name="fx">
                {/* <Input placeholder="code" disabled /> */}
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left" style={{ borderColor: "#128bed" }}>
            {`${FieldType[type]} Field Settings`}
          </Divider>
          {renderDynamicContent()}
        </Form>
      </Card>
    </div>
  );
};

export default FieldDefForm;
