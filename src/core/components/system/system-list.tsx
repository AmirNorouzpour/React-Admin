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

const SystemList: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<System[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const fetchData = async (params: any = {}) => {
    setLoading(true);
    try {
      params.reportId = "0a031c92-a079-4964-954b-deefe3ba04a2";
      const queryString = new URLSearchParams(params).toString();
      const response = await getRequest<{
        data: System[];
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
      entity: "Systems",
      hidden: true,
    }),
    ColumnFactory.createColumn({
      title: "Name",
      dataIndex: "Name",
      key: "name",
      type: TableColumnType.Text,
      sorter: true,
      entity: "Systems",
    }),
    ColumnFactory.createColumn({
      title: "Icon",
      dataIndex: "Icon",
      key: "icon",
      type: TableColumnType.Text,
      sorter: true,
      entity: "Systems",
    }),
    ColumnFactory.createColumn({
      title: "Insert Date",
      dataIndex: "InsertDateTime",
      key: "insertDateTime",
      type: TableColumnType.DateTime,
      sorter: true,
      entity: "Systems",
    }),
    ColumnFactory.createColumn({
      title: "Is Active",
      dataIndex: "IsActive",
      key: "isActive",
      entity: "Systems",
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
      title="Systems List"
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

export default SystemList;
