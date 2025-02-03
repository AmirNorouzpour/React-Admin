import React, { useEffect, useState } from "react";
import { Card, Form, Input, Row, Col, Select } from "antd";
import { FieldType } from "../../models/field-type.ts";
import Toolbar from "../toolbar/toolbar.tsx";
import buttonData from "../../models/button-data.ts";
import { ActionType, actionTypeColors } from "../../models/action-type.ts";
import TextArea from "antd/es/input/TextArea";

const buttons: buttonData[] = [
  { id: 1, label: "Save", type: "primary" },
  { id: 2, label: "Save And New", type: "primary" },
  { id: 3, label: "Cancel", type: "danger" },
];

interface FieldDefFormProps {
  onActionDefSave: (newActionDef: any, close: boolean) => void;
  onActionDefCancel: () => void;
  action: {};
}
const ActionDefForm: React.FC<FieldDefFormProps> = ({
  onActionDefSave,
  onActionDefCancel,
  action,
}) => {
  const [form] = Form.useForm();
  const [type, setActionType] = useState<FieldType>(FieldType.Text);
  const [close, setClose] = useState(false);

  useEffect(() => {
    debugger;
    if (action?.id) {
      setActionType(action.type);
      form.setFieldsValue({ ...action });
    } else form.resetFields();
  }, [action]);

  const onFinish = (actionDef: any) => {
    actionDef.id = action.id;
    onActionDefSave(actionDef, close);
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
      onActionDefCancel();
    }
  };

  return (
    <div>
      <Card
        title="Action Def"
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
                  disabled={action?.id != null}
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
                initialValue={1}
                rules={[{ required: true, message: "Please choose the type" }]}
              >
                <Select
                  placeholder="Please choose the type"
                  onChange={(value) => setActionType(value)}
                  disabled={action?.id != null}
                  options={[
                    {
                      label: (
                        <span
                          style={{ color: actionTypeColors[ActionType.Button] }}
                        >
                          Button
                        </span>
                      ),
                      value: ActionType.Button,
                    },
                    {
                      label: (
                        <span
                          style={{
                            color: actionTypeColors[ActionType.ToolbarButton],
                          }}
                        >
                          ToolbarButton
                        </span>
                      ),
                      value: ActionType.ToolbarButton,
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={24}>
              <Form.Item name="code" label="Code">
                <TextArea rows={10} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default ActionDefForm;
