import { Button, Card, Drawer, Space, message } from "antd";
import React, { useState } from "react";
import CustomTable from "../table/table.tsx";
import { ColumnFactory } from "../column/column-factory.tsx";
import "./typedef.css";
import { getRequest } from "../../services/apiService.ts";
import Toolbar from "../toolbar/toolbar.tsx";
import FieldDefForm from "../fielddef/fielddef-form.tsx";
import { FieldType, fieldTypeToOptions } from "../../models/field-type.ts";
import { ApiResult } from "../../models/api-result.ts";

interface FieldDef {
  id: string;
  title: string;
  type: string;
  name: string;
}

interface TypedefFieldsProps {
  typedefId: string;
  fields;
  setFields;
}

const toolbarButtons: [] = [
  { id: 1, label: "New", type: "primary" },
  { id: 2, label: "Edit", type: "primary" },
  { id: 3, label: "Delete", type: "danger", hasConfirm: true },
];

const TypedefFields: React.FC<TypedefFieldsProps> = ({
  typedefId,
  fields,
  setFields,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedField, setSelectedField] = useState<{}>({});

  const columns = [
    ColumnFactory.createColumn({
      title: "Id",
      dataIndex: "id",
      key: "id",
      type: FieldType.Text,
      sorter: true,
      entity: "FieldDefs",
      hidden: true,
    }),
    ColumnFactory.createColumn({
      title: "Name",
      dataIndex: "name",
      key: "name",
      type: FieldType.Text,
      sorter: true,
      entity: "FieldDefs",
    }),
    ColumnFactory.createColumn({
      title: "Title",
      dataIndex: "title",
      key: "title",
      type: FieldType.Text,
      sorter: true,
      entity: "FieldDefs",
    }),
    ColumnFactory.createColumn({
      title: "Type",
      dataIndex: "type",
      key: "type",
      type: FieldType.Enum,
      sorter: true,
      entity: "FieldDefs",
      options: fieldTypeToOptions(),
    }),
    // ColumnFactory.createColumn({
    //   title: "Is Fx",
    //   dataIndex: "isFx",
    //   key: "isFx",
    //   type: TableColumnType.Boolean,
    //   sorter: true,
    //   entity: "FieldDefs",
    //   options: [
    //     { label: "No", value: "false" },
    //     { label: "Yes", value: "true" },
    //   ],
    //   width: 100,
    //   responsive: ["md"],
    // }),
  ];

  const handleToolbarClick = (label: string, id: number) => {
    switch (id) {
      case 1:
        setSelectedField({});
        setIsDrawerOpen(true);
        break;
      case 2:
        if (selectedRowKeys.length > 0) {
          var field = fields.filter(
            (x) => x.id == selectedRowKeys[0].toString()
          );
          setSelectedField(field[0]);
          setIsDrawerOpen(true);
        } else {
          message.warning("Please select a field for edit");
        }
        break;
      case 3:
        debugger;
        const updatedFields = fields.filter(
          (field) => !selectedRowKeys.includes(field.id)
        );
        setFields(updatedFields);
        break;
      default:
        break;
    }
  };

  function ondblclick(id) {
    var field = fields.filter((x) => x.id == id.toString());
    setSelectedField(field[0]);
    setIsDrawerOpen(true);
  }

  const fetchData = async (params: any = {}) => {
    return;
  };

  function transformData(input) {
    debugger;
    let output = {
      id: input.id ?? crypto.randomUUID(),
      name: input.name,
      title: input.title,
      type: input.type,
      settings: {},
    };

    for (let key in input) {
      if (!["name", "title", "type"].includes(key)) {
        output.settings[key] = input[key] === undefined ? null : input[key];
      }
    }
    output.settings = JSON.stringify(output.settings);
    return output;
  }

  const handleSaveFieldDef = (fieldDef: any, close: boolean) => {
    fieldDef = transformData(fieldDef);

    setFields((prevData) => {
      if (!Array.isArray(prevData)) return [fieldDef];

      const existingIndex = prevData.findIndex(
        (item) => item.name === fieldDef.name
      );

      if (existingIndex !== -1) {
        const updatedFields = [...prevData];
        updatedFields[existingIndex] = fieldDef;
        return updatedFields;
      } else {
        return [...prevData, fieldDef];
      }
    });

    if (close) setIsDrawerOpen(false);
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
          scroll={2}
          rowKey="id"
          dataSource={fields}
          loading={loading}
          onFetchData={fetchData}
          rowSelection={{
            selectedRowKeys,
            onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
          }}
          onRow={(record) => ({
            onDoubleClick: () => {
              ondblclick(record.id);
            },
          })}
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
          field={selectedField}
          onFieldDefSave={handleSaveFieldDef}
          onFieldDefCancel={handleCancel}
        />
      </Drawer>
    </div>
  );
};

export default TypedefFields;
