import { Card } from "antd";
import React, { useState } from "react";
import CustomTable from "../table/table.tsx";
import { ColumnFactory } from "../column/column-factory.tsx";
import { FieldType } from "../../models/field-type.ts";

const TypedefActions: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedRowKey, setSelectedRowKey] = useState<React.Key>();
  const columns = [
    ColumnFactory.createColumn({
      title: "Id",
      dataIndex: "Id",
      key: "id",
      type: FieldType.Text,
      sorter: true,
      entity: "FieldDefs",
      hidden: true,
    }),
    ColumnFactory.createColumn({
      title: "Title",
      dataIndex: "Title",
      key: "title",
      type: FieldType.Text,
      sorter: true,
      entity: "FieldDefs",
    }),
    ColumnFactory.createColumn({
      title: "Location",
      dataIndex: "Location",
      key: "location",
      type: FieldType.Enum,
      sorter: true,
      entity: "FieldDefs",
      options: [
        { label: "Form", value: "1" },
        { label: "Toolbar", value: "2" },
      ],
    }),
  ];

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

  return (
    <Card
      style={{ minWidth: 100 }}
      size="small"
      type="inner"
      title={"Actions Fields"}
    >
      <CustomTable
        columns={columns}
        dataSource={[]}
        loading={loading}
        onFetchData={fetchData}
        rowSelection={{
          selectedRowKey,
          onChange: (keys: React.Key[]) => setSelectedRowKey(keys[0]),
        }}
        onRow={(record) => ({
          // onDoubleClick: () => {
          //   navigate("/typedef/form", { state: { selectedKey: record.Id } });
          // },
        })}
      />
    </Card>
  );
};

export default TypedefActions;
