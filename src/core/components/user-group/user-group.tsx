import React, { useState } from "react";
import { Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { deleteRequest, getRequest } from "../../services/apiService.ts";
import Toolbar from "../toolbar/toolbar.tsx";
import CustomTable from "../table/table.tsx";
import { ColumnFactory } from "../column/column-factory.tsx";
import buttonData from "../../models/button-data.ts";
import { TableColumnType } from "../../models/column-types.ts";

const buttons: buttonData[] = [
  { id: 1, label: "New", type: "primary" },
  { id: 2, label: "Edit", type: "primary" },
  { id: 3, label: "Delete", type: "danger", hasConfirm: true },
];

const UserGroupList: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<System[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const fetchData = async (params: any = {}) => {
    setLoading(true);
    try {
      params.reportId = "42165a76-3869-44f5-9922-85742807b2a5";
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
      //   deleteUsers(selectedRowKeys);
    }
  };

  const columns = [
    ColumnFactory.createColumn({
      title: "Id",
      dataIndex: "Id",
      key: "id",
      type: TableColumnType.Text,
      sorter: true,
      hidden: true,
      entity: "Groups",
    }),
    ColumnFactory.createColumn({
      title: "Name",
      dataIndex: "Name",
      key: "name",
      type: TableColumnType.Text,
      sorter: true,
      entity: "Groups",
    }),
    ColumnFactory.createColumn({
      title: "Insert Date",
      dataIndex: "InsertDateTime",
      key: "insertDateTime",
      type: TableColumnType.DateTime,
      sorter: true,
      entity: "Groups",
    }),
    ColumnFactory.createColumn({
      title: "Is Active",
      dataIndex: "IsActive",
      key: "isActive",
      type: TableColumnType.Boolean,
      sorter: true,
      entity: "Groups",
      options: [
        { label: "Yes", value: "true" },
        { label: "No", value: "false" },
      ],
    }),
  ];

  return (
    <Card
      title="User Groups List"
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

export default UserGroupList;
