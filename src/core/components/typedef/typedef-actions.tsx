import { Card, Drawer, message } from "antd";
import React, { useEffect, useState } from "react";
import CustomTable from "../table/table.tsx";
import { ColumnFactory } from "../column/column-factory.tsx";
import { FieldType } from "../../models/field-type.ts";
import Toolbar from "../toolbar/toolbar.tsx";
import { getRequest } from "../../services/apiService.ts";
import ActionDefForm from "../actiondef/actiondef-form.tsx";

interface TypedefActionsProps {
  typedefId: string;
  actions;
  setActions;
}

const toolbarButtons: [] = [
  { id: 1, label: "New", type: "primary" },
  { id: 2, label: "Edit", type: "primary" },
  { id: 3, label: "Delete", type: "danger", hasConfirm: true },
];

const TypedefActions: React.FC<TypedefActionsProps> = ({
  typedefId,
  actions,
  setActions,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<{}>({});

  useEffect(() => {
    var f = actions;
    debugger;
  }, []);
  const columns = [
    ColumnFactory.createColumn({
      title: "Id",
      dataIndex: "Id",
      key: "id",
      type: FieldType.Text,
      sorter: true,
      entity: "Actions",
      hidden: true,
    }),
    ColumnFactory.createColumn({
      title: "Name",
      dataIndex: "name",
      key: "name",
      type: FieldType.Text,
      sorter: true,
      entity: "Actions",
    }),
    ColumnFactory.createColumn({
      title: "Title",
      dataIndex: "title",
      key: "title",
      type: FieldType.Text,
      sorter: true,
      entity: "Actions",
    }),
    ColumnFactory.createColumn({
      title: "Location",
      dataIndex: "location",
      key: "location",
      type: FieldType.Enum,
      sorter: true,
      entity: "Actions",
      options: [
        { label: "Form", value: "1", color: "blue" },
        { label: "List", value: "2", color: "red" },
        { label: "Both", value: "3", color: "purple" },
      ],
    }),
    ColumnFactory.createColumn({
      title: "Type",
      dataIndex: "type",
      key: "type",
      type: FieldType.Enum,
      sorter: true,
      entity: "Actions",
      options: [
        { label: "Button", value: "1", color: "blue" },
        { label: "Toolbar Button", value: "2", color: "red" },
      ],
    }),
  ];

  const fetchData = async (params: any) => {
    return;
  };

  const handleSaveActionDef = (actionDef: any, close: boolean) => {
    setActions((prevData) => {
      if (!Array.isArray(prevData)) return [actionDef];

      const existingIndex = prevData.findIndex(
        (item) => item.name === actionDef.name
      );

      if (existingIndex !== -1) {
        const updatedFields = [...prevData];
        updatedFields[existingIndex] = actionDef;
        return updatedFields;
      } else {
        return [...prevData, actionDef];
      }
    });

    if (close) setIsDrawerOpen(false);
  };

  const handleToolbarClick = (label: string, id: number) => {
    switch (id) {
      case 1:
        setSelectedAction({});
        setIsDrawerOpen(true);
        break;
      case 2:
        if (selectedRowKeys.length > 0) {
          var field = actions.filter(
            (x) => x.id == selectedRowKeys[0].toString()
          );
          setSelectedAction(field[0]);
          setIsDrawerOpen(true);
        } else {
          message.warning("Please select a field for edit");
        }
        break;
      case 3:
        const updatedFields = actions.filter(
          (field) => !selectedRowKeys.includes(field.id)
        );
        setActions(updatedFields);
        break;
      default:
        break;
    }
  };

  const ondblclick = (id) => {
    var action = actions.filter((x) => x.id == id.toString());
    setSelectedAction(action[0]);
    setIsDrawerOpen(true);
  };

  const handleCancel = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div>
      <Card
        style={{ minWidth: 100 }}
        size="small"
        type="inner"
        extra={
          <Toolbar
            buttonData={toolbarButtons}
            onButtonClick={handleToolbarClick}
          />
        }
        title={"Actions Fields"}
      >
        <CustomTable
          columns={columns}
          dataSource={actions}
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
        <div>
          <ActionDefForm
            action={selectedAction}
            onActionDefSave={handleSaveActionDef}
            onActionDefCancel={handleCancel}
          />{" "}
        </div>
      </Drawer>
    </div>
  );
};

export default TypedefActions;
