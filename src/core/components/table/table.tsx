import React, { useState } from "react";
import { Table, Spin } from "antd";
import type { TableProps } from "antd/es/table";
import { TableColumnType } from "../../models/column-types.ts";

interface CustomTableProps {
  columns: TableProps<any>["columns"];
  dataSource: any[];
  loading: boolean;
  onFetchData: (params: {
    page: number;
    pageSize: number;
    sortField?: string;
    sortOrder?: "ASC" | "DESC";
    filters?: string;
  }) => Promise<{ data: any[]; total: number }>;
  rowSelection?: TableProps<any>["rowSelection"];
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  dataSource,
  loading,
  onFetchData,
  rowSelection,
}) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const handleTableChange: TableProps<any>["onChange"] = async (
    pagination,
    filters,
    sorter
  ) => {
    const params: any = {
      page: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
    };

    if (sorter.order) {
      params.sortField = sorter.field;
      params.sortOrder = sorter.order === "ascend" ? "ASC" : "DESC";
    }

    if (filters) {
      const filterTree: any = {
        condition: "and",
        rules: [],
      };

      columns?.forEach((col: any) => {
        const filterValues = filters[col.dataIndex];
        if (filterValues) {
          if (col.type === TableColumnType.DateTime) {
            const [startDate, endDate] = filterValues[0].split(",");
            filterTree.rules.push({
              condition: "and",
              rules: [
                { field: col.dataIndex, operator: ">", value: startDate },
                { field: col.dataIndex, operator: "<", value: endDate },
              ],
            });
          } else if (col.type === TableColumnType.Enum) {
            filterTree.rules.push({
              condition: "or",
              rules: filterValues.map((value: string) => ({
                field: col.dataIndex,
                operator: "=",
                value: value,
              })),
            });
          } else if (col.type === TableColumnType.Text) {
            filterTree.rules.push({
              field: col.dataIndex,
              operator: "like",
              value: filterValues[0],
            });
          } else if (col.type === TableColumnType.Integer) {
            filterTree.rules.push({
              field: col.dataIndex,
              operator: "=",
              value: filterValues[0],
            });
          }
        }
      });

      params.filters = JSON.stringify(filterTree); // ارسال فیلترها به‌صورت JSON
    }

    const response = await onFetchData(params);
    setPagination({
      ...pagination,
      current: params.page,
      pageSize: params.pageSize,
      total: response.total,
    });
  };

  return (
    <Spin spinning={loading}>
      <Table
        size="small"
        columns={columns}
        dataSource={dataSource}
        scroll={{ y: 80 * 5 }}
        bordered
        className="table-scroll"
        rowSelection={rowSelection}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
        }}
        onChange={handleTableChange}
        rowKey="Id"
      />
    </Spin>
  );
};

export default CustomTable;
