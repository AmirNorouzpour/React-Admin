import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../../services/apiService.ts";
import Toolbar from "../toolbar/toolbar.tsx";
import CustomTable from "../table/table.tsx";
import { ColumnFactory } from "../column/column-factory.tsx";
import User from "../../models/User.ts";
import ButtonData from "../../models/ButtonData.ts";
import { TableColumnType } from "../../models/column-types.ts";

const buttonData: ButtonData[] = [
  { id: 1, label: "New", type: "primary" },
  { id: 2, label: "Edit", type: "primary" },
  { id: 3, label: "Delete", type: "danger" },
];

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<{}>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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

  useEffect(() => {
    fetchData({
      page: 1,
      pageSize: 10,
    });
  }, []);

  const handleToolbarClick = (label: string, id: number) => {
    if (id === 1) {
      navigate("/user/form");
    }
    if (id === 2) {
      if (selectedRowKeys.length === 0) {
        alert("Please select a user to edit.");
        return;
      }
      navigate("/user/form", { state: { selectedRowKeys } });
    }
    if (id === 3) {
      if (selectedRowKeys.length === 0) {
        alert("Please select users to delete.");
        return;
      }
      console.log("Deleting users with IDs: ", selectedRowKeys);
    }
  };

  const columns = [
    ColumnFactory.createColumn({
      title: "User Name",
      dataIndex: "UserName",
      key: "UserName",
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
      title: "Gender",
      dataIndex: "GenderType",
      key: "GenderType",
      type: TableColumnType.Enum,
      sorter: true,
      options: [
        { label: "Male", value: "1" },
        { label: "Female", value: "2" },
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
      <CustomTable
        columns={columns}
        dataSource={data}
        loading={loading}
        onFetchData={fetchData}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
        }}
      />
    </Card>
  );
};

export default UserList;
