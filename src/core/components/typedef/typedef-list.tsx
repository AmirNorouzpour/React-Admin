import React, { useState } from "react";
import { Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { deleteRequest, getRequest } from "../../services/apiService.ts";
import Toolbar from "../toolbar/toolbar.tsx";
import CustomTable from "../table/table.tsx";
import { ColumnFactory } from "../column/column-factory.tsx";
import ButtonData from "../../models/ButtonData.ts";
import { TableColumnType } from "../../models/column-types.ts";

const buttonData: ButtonData[] = [
  { id: 1, label: "New", type: "primary" },
  { id: 2, label: "Edit", type: "primary" },
  { id: 3, label: "Delete", type: "danger", hasConfirm: true },
];

const TyepDefList: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

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

  const handleToolbarClick = (label: string, id: number) => {
    if (id === 1) {
      navigate("/typedef/form");
    }
    if (id === 2) {
      if (selectedRowKeys.length === 0) {
        messageApi.warning("Please select a user to edit.");
        return;
      }
      const selectedKey = selectedRowKeys[0];
      navigate("/typedef/form", { state: { selectedKey } });
    }
    if (id === 3) {
      if (selectedRowKeys.length === 0) {
        messageApi.warning("Please select users to delete.");
        return;
      }
      deleteTypeDef(selectedRowKeys);
    }
  };

  const deleteTypeDef = async (id: React.Key[]) => {
    try {
      const id = selectedRowKeys[0];
      await deleteRequest(`/api/base/typedef`, id);
      messageApi.success("Users deleted successfully!");
      fetchData();
      setSelectedRowKeys([]);
    } catch (error) {
      console.error("Error deleting users:", error);
      messageApi.error("Failed to delete users. Please try again.");
    }
  };
  const columns = [
    ColumnFactory.createColumn({
      title: "Id",
      dataIndex: "Id",
      key: "id",
      type: TableColumnType.Text,
      sorter: true,
      entity: "Typedefs",
      hidden: true,
    }),
    ColumnFactory.createColumn({
      title: "Name",
      dataIndex: "Name",
      key: "name",
      type: TableColumnType.Text,
      sorter: true,
      entity: "Typedefs",
    }),
    ColumnFactory.createColumn({
      title: "System Name",
      dataIndex: "SystemName",
      key: "systemName",
      filterKeyName: "Name",
      type: TableColumnType.Text,
      sorter: true,
      entity: "Systems",
      responsive: ["md"],
    }),
    ColumnFactory.createColumn({
      title: "Table Name",
      dataIndex: "TableName",
      key: "tableName",
      type: TableColumnType.Text,
      sorter: true,
      entity: "Typedefs",
    }),
    ColumnFactory.createColumn({
      title: "Insert Date",
      dataIndex: "InsertDateTime",
      key: "insertDateTime",
      type: TableColumnType.DateTime,
      sorter: true,
      entity: "Typedefs",
      responsive: ["md"],
    }),
  ];

  return (
    <Card
      title="TypeDefs List"
      type="inner"
      extra={
        <Toolbar buttonData={buttonData} onButtonClick={handleToolbarClick} />
      }
    >
      {contextHolder}
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
            navigate("/typedef/form", { state: { selectedKey: record.Id } });
          },
        })}
      />
    </Card>
  );
};

export default TyepDefList;
