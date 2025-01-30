import { Button, Card, Drawer, Space, message } from "antd";
import React, { useState } from "react";
import CustomTable from "../table/table.tsx";
import { ColumnFactory } from "../column/column-factory.tsx";
import { TableColumnType } from "../../models/column-types.ts";
import "./typedef.css";
import { getRequest } from "../../services/apiService.ts";
import Toolbar from "../toolbar/toolbar.tsx";
import FieldDefForm from "../fielddef/fielddef-form.tsx";
import { fieldTypeToOptions } from "../../models/field-type.ts";

interface FieldDef {
  Id: string;
  Title: string;
  Type: string;
  IsFx: boolean;
}

const toolbarButtons: [] = [
  { id: 1, label: "New", type: "primary" },
  { id: 2, label: "Edit", type: "primary" },
  { id: 3, label: "Delete", type: "danger", hasConfirm: true },
];

const TypedefFields: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedFieldId, setSelectedFieldId] = useState<string>("");
  const [fields, setFields] = useState<FieldDef[]>([]);

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
      options: fieldTypeToOptions(),
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
    switch (id) {
      case 1:
        setIsDrawerOpen(true);
        break;
      case 2:
        if (selectedRowKeys.length > 0) {
          setSelectedFieldId(selectedRowKeys[0].toString());
          setIsDrawerOpen(true);
        } else {
          message.warning("Please select a field for edit");
        }
        break;
      case 3:
        const updatedFields = fields.filter(
          (field) => !selectedRowKeys.includes(field.Id)
        );
        setFields(updatedFields);
        break;
      default:
        break;
    }
  };

  const fetchData = async (params: any = {}) => {
    setLoading(true);
    try {
      params.reportId = "5bfd40b1-63fe-46a4-ab58-104a1cf9680b";
      const queryString = new URLSearchParams(params).toString();
      const response = await getRequest<{ data: FieldDef[]; total: number }>(
        `/api/generic?${queryString}`
      );
      setFields(response.data);
    } catch (error) {
      console.error("Failed to fetch fields:", error);
      message.error("Failed to fetch fields");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFieldDef = (fieldDef: any) => {
    const newField: FieldDef = {
      Id: fieldDef.Id || crypto.randomUUID(),
      Title: fieldDef.title,
      Type: fieldDef.fieldType,
      IsFx: false,
    };
    setFields((prevData) => [...prevData, newField]);

    setIsDrawerOpen(false);
  };

  const handleCancel = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div>
      <Card
        title="Data Fields"
        type="inner"
        size="small"
        extra={
          <Toolbar
            buttonData={toolbarButtons}
            onButtonClick={handleToolbarClick}
          />
        }
      >
        <CustomTable
          columns={columns}
          dataSource={fields}
          loading={loading}
          onFetchData={fetchData}
          rowSelection={{
            selectedRowKeys,
            onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
          }}
        />
      </Card>
      <Drawer
        width={720}
        onClose={handleCancel}
        open={isDrawerOpen}
        closeIcon={false}
        styles={{ body: { paddingBottom: 10 } }}
      >
        <FieldDefForm
          fdId={selectedFieldId}
          onFieldDefSave={handleSaveFieldDef}
          onFieldDefCancel={handleCancel}
        />
      </Drawer>
    </div>
  );
};

export default TypedefFields;
