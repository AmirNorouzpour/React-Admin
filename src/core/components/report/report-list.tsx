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

const ReportsList: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const fetchData = async (params: any = {}) => {
    setLoading(true);
    try {
      params.reportId = "1e45d3d0-1639-4140-8e53-3d6fe6855b24";
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
      navigate("/reprot/form");
    }
    if (id === 2) {
      if (selectedRowKeys.length === 0) {
        messageApi.warning("Please select a user to edit.");
        return;
      }
      const selectedKey = selectedRowKeys[0];
      navigate("/reprot/form", { state: { selectedKey } });
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
      entity: "Reports",
      hidden: true,
    }),
    ColumnFactory.createColumn({
      title: "Name",
      dataIndex: "Name",
      key: "name",
      type: TableColumnType.Text,
      sorter: true,
      entity: "Reports",
    }),
    ColumnFactory.createColumn({
      title: "Typedef Name",
      dataIndex: "TypedefName",
      key: "typedefName",
      filterKeyName: "Name",
      type: TableColumnType.Text,
      sorter: true,
      entity: "Typedefs",
    }),
    ColumnFactory.createColumn({
      title: "Type",
      dataIndex: "Type",
      key: "type",
      type: TableColumnType.Enum,
      sorter: true,
      entity: "Reports",
      options: [
        { label: "List", value: "1" },
        { label: "Tree", value: "2" },
        { label: "Printable", value: "3" },
        { label: "Ghraph", value: "4" },
        { label: "Dashborad", value: "5" },
      ],
    }),
    ColumnFactory.createColumn({
      title: "Icon",
      dataIndex: "Icon",
      key: "icon",
      type: TableColumnType.Text,
      sorter: true,
      entity: "Reports",
    }),
    ColumnFactory.createColumn({
      title: "Insert Date",
      dataIndex: "InsertDateTime",
      key: "insertDateTime",
      type: TableColumnType.DateTime,
      sorter: true,
      entity: "Reports",
    }),
  ];

  return (
    <Card
      title="Reports List"
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
            navigate("/reprot/form", { state: { selectedKey: record.Id } });
          },
        })}
      />
    </Card>
  );
};

export default ReportsList;
