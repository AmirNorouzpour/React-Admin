import React, { useState } from "react";
import { Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { deleteRequest, getRequest } from "../../services/apiService.ts";
import Toolbar from "../toolbar/toolbar.tsx";
import CustomTable from "../table/table.tsx";
import { ColumnFactory } from "../column/column-factory.tsx";
import buttonData from "../../models/button-data.ts";
import { FieldType } from "../../models/field-type.ts";

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
      params.reportId = "dede0745-37ca-43b0-9a15-7489f78bb7b2";
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
      type: FieldType.Text,
      sorter: true,
      entity: "Reports",
      hidden: true,
    }),
    ColumnFactory.createColumn({
      title: "Name",
      dataIndex: "Name",
      key: "name",
      type: FieldType.Text,
      sorter: true,
      entity: "Reports",
    }),
    ColumnFactory.createColumn({
      title: "Typedef Name",
      dataIndex: "TypeDef",
      key: "typeDef",
      filterKeyName: "Id",
      type: FieldType.R1N,
      sorter: true,
      entity: "Typedefs",
      typeDefId: "828BA208-DAFA-43D8-8E81-DAC956264FBC",
    }),
    ColumnFactory.createColumn({
      title: "Type",
      dataIndex: "Type",
      key: "type",
      type: FieldType.Enum,
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
      type: FieldType.Text,
      sorter: true,
      entity: "Reports",
    }),
    ColumnFactory.createColumn({
      title: "Insert Date",
      dataIndex: "InsertDateTime",
      key: "insertDateTime",
      type: FieldType.DateTime,
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
            navigate("form", { state: { selectedKey: record.Id } });
          },
        })}
      />
    </Card>
  );
};

export default ReportsList;
