import { Card, Checkbox, Col, Form, Input, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { ApiResult } from "../../models/api-result.ts";
import { getRequest } from "../../services/apiService.ts";

interface TypedefSettingsProps {
  typedefId: string;
  captionFieldDefId: string;
  setCaptionFieldDefId;
}

const TypedefSettings: React.FC<TypedefSettingsProps> = ({
  typedefId,
  captionFieldDefId,
  setCaptionFieldDefId,
}) => {
  const [typedefFields, setTypedefFields] = useState<[]>([]);

  useEffect(() => {
    fetchFields();
  }, [typedefId]);
  const fetchFields = async () => {
    try {
      const response = await getRequest<ApiResult<any>>(
        "/api/base/getfields/" + typedefId
      );
      setTypedefFields(
        response.data.map((item) => ({
          label: item.title,
          value: item.id,
        }))
      );
    } catch (error: any) {
    } finally {
    }
  };

  return (
    <Card
      style={{ minWidth: 100 }}
      size="small"
      type="inner"
      title={"Typedef Settings"}
    >
      <Form
        layout="vertical"
        // form={form}
        style={{ maxWidth: 1400 }}
        // onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col xs={24} md={6} lg={4}>
            <Form.Item
              label="CaptionField"
              name="captionField"
              initialValue={captionFieldDefId}
            >
              <Select
                placeholder="Please choose the Caption Field"
                options={typedefFields}
                onSelect={(id) => {
                  setCaptionFieldDefId(id);
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6} lg={4}>
            <Form.Item label="View" name="view">
              <Select
                placeholder="Please select a View"
                options={typedefFields}
                onSelect={(id) => {
                  setCaptionFieldDefId(id);
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6} lg={4}>
            <Form.Item label="Typedef Type" name="typeDefType" initialValue={1}>
              <Select
                placeholder="select a Type"
                options={[
                  { label: "Normal", value: 1 },
                  { label: "Base", value: 2 },
                ]}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6} lg={4}>
            <Form.Item
              label="Soft Delete"
              name="softDelete"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
          </Col>
          <Col xs={24} md={6} lg={4}>
            <Form.Item
              label="InsertDateTime Column"
              name="insertDateColumn"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
          </Col>
          <Col xs={24} md={6} lg={4}>
            <Form.Item
              label="EditDateTime Column"
              name="EditDateColumn"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={6} lg={4}>
            <Form.Item
              label="Creator User Column"
              name="creatorUserId"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
          </Col>
          <Col xs={24} md={6} lg={4}>
            <Form.Item
              label="Editor User Column"
              name="editorUserId"
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
          </Col>
          <Col xs={24} md={6} lg={4}>
            {" "}
            <Form.Item label="Audit" name="audit">
              <Checkbox></Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default TypedefSettings;
