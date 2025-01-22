import React, { useState } from "react";
import { Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { deleteRequest, getRequest } from "../../services/apiService.ts";
import Toolbar from "../toolbar/toolbar.tsx";
import CustomTable from "../table/table.tsx";
import { ColumnFactory } from "../column/column-factory.tsx";
import User from "../../models/User.ts";
import ButtonData from "../../models/ButtonData.ts";
import { TableColumnType } from "../../models/column-types.ts";

const buttonData: ButtonData[] = [
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
      const queryString = new URLSearchParams(params).toString();
      const response = await getRequest<{
        data: User[];
        total: number;
      }>(`/api/users?${queryString}`);
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
      navigate("/user/form");
    }
    if (id === 2) {
      if (selectedRowKeys.length === 0) {
        messageApi.warning("Please select a user to edit.");
        return;
      }
      const selectedKey = selectedRowKeys[0];
      navigate("/user/form", { state: { selectedKey } });
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
      debugger;
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
      title: "Full Name",
      dataIndex: "FullName",
      key: "FullName",
      type: TableColumnType.Text,
      sorter: true,
    }),
    ColumnFactory.createColumn({
      title: "User Name",
      dataIndex: "Username",
      key: "Username",
      type: TableColumnType.Text,
      sorter: true,
    }),
    ColumnFactory.createColumn({
      title: "Insert Date",
      dataIndex: "InsertDateTime",
      key: "InsertDateTime",
      type: TableColumnType.DateTime,
      sorter: true,
    }),
    ColumnFactory.createColumn({
      title: "Can Login",
      dataIndex: "CanLogin",
      key: "CanLogin",
      type: TableColumnType.Boolean,
      sorter: true,
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
            navigate("/user/form", { state: { selectedKey: record.Id } });
          },
        })}
      />
    </Card>
  );
};

export default UserList;
