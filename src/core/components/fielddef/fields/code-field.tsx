import React, { useState } from "react";
import { Form, Row, Col, Select, TreeSelect, Input } from "antd";
import TypeDefTreeSelect from "../../typedef/lookup/typedef-tree-select.tsx";

const { TextArea } = Input;
const CodeSettings: React.FC = () => {
  const [typedefValue, setTypedefValue] = useState<string | undefined>();

  return (
    <div>
      <Row gutter={16}>
        <Col xs={12}>
          <Form.Item
            label="Code Language"
            name="language"
            initialValue={"1"}
            rules={[
              { required: true, message: "Please choose the Code Language" },
            ]}
          >
            <Select
              // onChange={(value) => setDataType(value)}
              options={[
                { label: <span>C#</span>, value: "1" },
                { label: <span>JavaScript</span>, value: "2" },
                { label: <span>SQL</span>, value: "3" },
              ]}
            />
          </Form.Item>
        </Col>

        <Col xs={12}>
          <Form.Item label="Parameter Type" name="parameterTypedef">
            <TypeDefTreeSelect
              value={typedefValue}
              onChange={setTypedefValue}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24}>
          <Form.Item label="Code Template" name="template">
            <TextArea rows={5} />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default CodeSettings;
