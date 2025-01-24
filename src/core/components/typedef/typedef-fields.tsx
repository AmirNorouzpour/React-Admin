import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from "antd";
import React, { useState } from "react";
import CustomTable from "../table/table.tsx";
import { ColumnFactory } from "../column/column-factory.tsx";
import { TableColumnType } from "../../models/column-types.ts";
import "./typedef.css";
import { getRequest } from "../../services/apiService.ts";
import Toolbar from "../toolbar/toolbar.tsx";
import ButtonData from "../../models/ButtonData.ts";

const { Option } = Select;
const buttonData: ButtonData[] = [
  { id: 1, label: "New", type: "primary" },
  { id: 2, label: "Edit", type: "primary" },
  { id: 3, label: "Delete", type: "danger", hasConfirm: true },
];

const TypedefFields: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedRowKey, setSelectedRowKey] = useState<React.Key>();
  const [open, setOpen] = useState(false);
  const [fieldType, setFieldType] = useState<string | undefined>();

  const columns = [
    ColumnFactory.createColumn({
      title: "Id",
      dataIndex: "Id",
      key: "id",
      type: TableColumnType.Text,
      sorter: true,
      entity: "FieldDefs",
      hidden: true,
    }),
    ColumnFactory.createColumn({
      title: "Title",
      dataIndex: "Title",
      key: "title",
      type: TableColumnType.Text,
      sorter: true,
      entity: "FieldDefs",
    }),
    ColumnFactory.createColumn({
      title: "Type",
      dataIndex: "Type",
      key: "type",
      type: TableColumnType.Enum,
      sorter: true,
      entity: "FieldDefs",
      options: [
        { label: "Text", value: "1" },
        { label: "Number", value: "2" },
        { label: "RichText", value: "3" },
        { label: "Date", value: "4" },
        { label: "Boolean", value: "5" },
        { label: "File", value: "6" },
        { label: "R1N", value: "7" },
        { label: "RNN", value: "8" },
        { label: "Icon", value: "9" },
      ],
    }),
    ColumnFactory.createColumn({
      title: "Is Fx",
      dataIndex: "IsFx",
      key: "isFx",
      type: TableColumnType.Boolean,
      sorter: true,
      entity: "FieldDefs",
      options: [
        { label: "No", value: "false" },
        { label: "Yes", value: "true" },
      ],
      width: 100,
      responsive: ["md"],
    }),
  ];

  const handleToolbarClick = (label: string, id: number) => {
    if (id === 1) {
      showDrawer();
    }
  };

  const fetchData = async (params: any = {}) => {
    setLoading(true);
    try {
      params.reportId = "5bfd40b1-63fe-46a4-ab58-104a1cf9680a";
      const queryString = new URLSearchParams(params).toString();
      const response = await getRequest<{
        data: [];
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

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const { TextArea } = Input;
  const renderDynamicContent = () => {
    switch (fieldType) {
      case "1": // Text
        return <Input placeholder="Enter text value" />;
      case "2": // Number
        return <InputNumber placeholder="Enter numeric value" />;
      case "3": // RichText
        return <TextArea rows={4} placeholder="maxLength is 6" />;
      case "4": // Date
        return <Input type="date" />;
      case "5": // Boolean
        return <Checkbox>Boolean Value</Checkbox>;
      case "6": // File
        return <Input type="file" />;
      case "7": // R1N
        return <div>Relation One to Many (R1N)</div>;
      case "8": // RNN
        return <div>Relation Many to Many (RNN)</div>;
      default:
        return <div>Please select a field type</div>;
    }
  };

  return (
    <div>
      <Card
        title={"Data Fields"}
        type="inner"
        size="small"
        extra={
          <Toolbar buttonData={buttonData} onButtonClick={handleToolbarClick} />
        }
      >
        <CustomTable
          columns={columns}
          dataSource={[]}
          loading={loading}
          onFetchData={fetchData}
          rowSelection={{
            selectedRowKey,
            onChange: (keys: React.Key[]) => setSelectedRowKey(keys[0]),
          }}
          onRow={(record) => ({
            // onDoubleClick: () => {
            //   navigate("/typedef/form", { state: { selectedKey: record.Id } });
            // },
          })}
        />
      </Card>
      <Drawer
        title="Typdedef field"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Save
            </Button>
          </Space>
        }
      >
        <Form layout="vertical">
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
          <Divider />
          <Row>
            <Col span={24}>
              <h4>Dynamic Content</h4>
              {renderDynamicContent()}
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};

export default TypedefFields;
