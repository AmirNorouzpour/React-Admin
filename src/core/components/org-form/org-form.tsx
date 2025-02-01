import React, { useEffect, useState } from "react";
import { Card, Form, message, Input, Radio, Row, Col } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import Toolbar from "../toolbar/toolbar.tsx";
import { getRequest, postRequest } from "../../services/apiService.ts";
import "./org-form.css";
import CustomTable from "../table/table.tsx";
import { ColumnFactory } from "../column/column-factory.tsx";
import User from "../../models/User.ts";
import { FieldType } from "../../models/field-type.ts";

const buttonData = [
  { id: 1, label: "Save", type: "primary" },
  { id: 2, label: "Cancel", type: "default" },
];

interface OrgFormData {
  key: string;
  type: string;
  name: string;
  parentKey?: string;
}

const OrgForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const { key, parent, type, title } = location.state || {};
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    form.setFieldsValue({
      type: type || 1,
      name: title || "",
    });
  }, [form, type, title]);

  const onFinish = async (values: OrgFormData) => {
    try {
      const dataToSend = { ...values, parent: parent };
      await postRequest<OrgFormData>("/org", dataToSend);
      messageApi.success("Data saved successfully!");
      navigate("/system-management/org-chart");
    } catch (error: any) {
      messageApi.error(error.message || "An error occurred");
    }
  };

  const handleButtonClick = (label: string, id: number) => {
    if (id === 2) {
      navigate("/system-management/org-chart");
    } else {
      form.submit();
    }
  };

  const columns = [
    ColumnFactory.createColumn({
      title: "User Name",
      dataIndex: "Username",
      key: "username",
      entity: "Users",
      type: FieldType.Text,
      sorter: true,
    }),

    ColumnFactory.createColumn({
      title: "Insert Date",
      dataIndex: "InsertDateTime",
      key: "insertDateTime",
      entity: "OrganizationUsers",
      type: FieldType.DateTime,
      sorter: true,
    }),
  ];

  const fetchData = async (params: any = {}) => {
    setLoading(true);
    try {
      params.reportId = "c0cb0d3a-4eab-47cd-93f8-43e0c7716262";
      var cnds = JSON.parse(params.filters);
      cnds.rules.push({
        field: "OrganizationId",
        operator: "=",
        value: key,
        entity: "OrganizationUsers",
      });
      params.filters = JSON.stringify(cnds);
      const queryString = new URLSearchParams(params).toString();
      const response = await getRequest<{
        data: User[];
        total: number;
      }>(`/api/generic?${queryString}`);
      setData(response.data);
      return response;
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {contextHolder}

      <Card
        title="Organization Chart Form"
        type="inner"
        extra={
          <Toolbar buttonData={buttonData} onButtonClick={handleButtonClick} />
        }
      >
        <Form
          layout="vertical"
          form={form}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: "Please select a type" }]}
              >
                <Radio.Group size="small">
                  <Radio.Button style={{ fontSize: "12px" }} value={1}>
                    Department
                  </Radio.Button>
                  <Radio.Button style={{ fontSize: "12px" }} value={2}>
                    Position
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input the name" }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {key != null && (
        <Card
          title={`Assigned Users To ${title}`}
          type="inner"
          style={{ marginTop: "20px" }}
        >
          <CustomTable
            columns={columns}
            dataSource={data}
            loading={loading}
            onFetchData={fetchData}
            rowSelection={{
              selectedRowKeys,
              onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
            }}
            onRow={(record) => ({
              onDoubleClick: () => {
                // navigate("/user/form", { state: { selectedKey: record.Id } });
              },
            })}
          />
        </Card>
      )}
    </div>
  );
};

export default OrgForm;
