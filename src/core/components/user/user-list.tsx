import React, { useState } from "react";
import { Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { deleteRequest, getRequest } from "../../services/apiService.ts";
import Toolbar from "../toolbar/toolbar.tsx";
import CustomTable from "../table/table.tsx";
import { ColumnFactory } from "../column/column-factory.tsx";
import User from "../../models/User.ts";
import buttonData from "../../models/button-data.ts";
import { FieldType } from "../../models/field-type.ts";

const buttons: buttonData[] = [
  { id: 1, label: "New", type: "primary" },
  { id: 2, label: "Edit", type: "primary" },
  { id: 3, label: "Delete", type: "danger", hasConfirm: true },
];

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const fetchData = async (params: any = {}) => {
    setLoading(true);
    try {
      params.reportId = "d9ffdbc3-0253-4c0c-a35a-1892889aba16";
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

  const handleToolbarClick = (label: string, id: number) => {
    if (id === 1) {
      navigate("form");
    }
    if (id === 2) {
      if (selectedRowKeys.length === 0) {
        messageApi.warning("Please select a user to edit.");
        return;
      }
      const selectedKey = selectedRowKeys[0];
      navigate("form", { state: { selectedKey } });
    }
    if (id === 3) {
      if (selectedRowKeys.length === 0) {
        messageApi.warning("Please select users to delete.");
        return;
      }
      deleteUsers(selectedRowKeys);
    }
  };

  const deleteUsers = async (ids: React.Key[]) => {
    try {
      await deleteRequest(`/api/users`, ids); // ارسال شناسه‌ها به سرور
      messageApi.success("Users deleted successfully!");
      fetchData(); // به‌روزرسانی لیست پس از حذف
      setSelectedRowKeys([]); // پاک کردن انتخاب‌ها
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
      type: FieldType.Text,
      sorter: true,
      entity: "Users",
      hidden: true,
    }),
    ColumnFactory.createColumn({
      title: "Full Name",
      dataIndex: "FullName",
      key: "FullName",
      type: FieldType.Text,
      sorter: true,
      entity: "Users",
    }),
    ColumnFactory.createColumn({
      title: "User Name",
      dataIndex: "Username",
      key: "Username",
      type: FieldType.Text,
      sorter: true,
      entity: "Users",
    }),
    ColumnFactory.createColumn({
      title: "Insert Date",
      dataIndex: "InsertDateTime",
      key: "InsertDateTime",
      type: FieldType.DateTime,
      sorter: true,
      entity: "Users",
    }),
    ColumnFactory.createColumn({
      title: "Can Login",
      dataIndex: "CanLogin",
      key: "CanLogin",
      type: FieldType.Boolean,
      sorter: true,
      entity: "Users",
      options: [
        { label: "Yes", value: "true" },
        { label: "No", value: "false" },
      ],
    }),
  ];

  return (
    <Card
      title="Users List"
      type="inner"
      extra={
        <Toolbar buttonData={buttons} onButtonClick={handleToolbarClick} />
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
            navigate("form", { state: { selectedKey: record.Id } });
          },
        })}
      />
    </Card>
  );
};

export default UserList;
