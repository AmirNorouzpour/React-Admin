import { Button, Card, Drawer, Space } from "antd";
import React, { useState } from "react";
import CustomTable from "../table/table.tsx";
import { ColumnFactory } from "../column/column-factory.tsx";
import { TableColumnType } from "../../models/column-types.ts";
import "./typedef.css";
import { getRequest } from "../../services/apiService.ts";
import Toolbar from "../toolbar/toolbar.tsx";
import ButtonData from "../../models/ButtonData.ts";
import FieldDefForm from "../fielddef/fielddef-form.tsx";

const buttonData: ButtonData[] = [
  { id: 1, label: "New", type: "primary" },
  { id: 2, label: "Edit", type: "primary" },
  { id: 3, label: "Delete", type: "danger", hasConfirm: true },
];

const TypedefFields: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedRowKey, setSelectedRowKey] = useState<React.Key>();
  const [open, setOpen] = useState(false);

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
        <FieldDefForm />
      </Drawer>
    </div>
  );
};

export default TypedefFields;
