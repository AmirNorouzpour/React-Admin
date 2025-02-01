import React, { useState } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  ColorPicker,
  Select,
  InputNumber,
} from "antd";
import "./fields.css";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
const EnumSettings: React.FC = () => {
  const [count, setCount] = useState(1);
  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} md={24}>
          <Form.Item label="EnumType" name="enumType">
            <Select
              placeholder="Please choose the type"
              // onChange={(value) => setDataType(value)}
              options={[
                { label: <span>Single Select</span>, value: "1" },
                { label: <span>Multiple Select</span>, value: "2" },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24}>
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row key={key} gutter={10} align="middle">
                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "value"]}
                        rules={[
                          { required: true, message: "Please enter value" },
                        ]}
                      >
                        <InputNumber placeholder="Value" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, "name"]}
                        rules={[
                          { required: true, message: "Please enter name" },
                        ]}
                      >
                        <Input placeholder="Title" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "color"]}
                        getValueFromEvent={(color) => color.toHexString()}
                      >
                        <ColorPicker
                          showText
                          format="hex"
                          defaultValue="#1677ff"
                          size="small"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Button
                        style={{ marginBottom: 25 }}
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => remove(name)}
                      />
                    </Col>
                  </Row>
                ))}
                <Button
                  type="dashed"
                  onClick={() => {
                    setCount(count + 1);
                    add({
                      value: count,
                      name: "",
                      color:
                        "#" +
                        ((Math.random() * 0xffffff) << 0)
                          .toString(16)
                          .padStart(6, "0"),
                    });
                  }}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Item
                </Button>
              </>
            )}
          </Form.List>
        </Col>
      </Row>
    </div>
  );
};

export default EnumSettings;
