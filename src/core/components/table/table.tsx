import React, { useState, useEffect } from "react";
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
  onRow?: TableProps<any>["onRow"]; // Add onRow prop
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  dataSource,
  loading,
  onFetchData,
  rowSelection,
  onRow, // Accept onRow as a prop
}) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [filters, setFilters] = useState<any>({});
  const [sorter, setSorter] = useState<any>({});

  const buildFilterTree = (filters: any) => {
    const filterTree: any = {
      condition: "and",
      rules: [],
    };

    columns?.forEach((col: any) => {
      let key = col.key;
      if (col.filterKeyName) key = col.filterKeyName;
      const filterValues = filters[col.key];
      if (filterValues) {
        if (col.type === TableColumnType.DateTime) {
          const [startDate, endDate] = filterValues[0]?.split(",") || [];
          const rules = [];
          if (startDate) {
            rules.push({
              field: key,
              operator: ">=",
              value: startDate,
              entity: col.entity,
            });
          }
          if (endDate) {
            rules.push({
              field: key,
              operator: "<=",
              value: endDate,
              entity: col.entity,
            });
          }
          if (rules.length > 0) {
            filterTree.rules.push({
              condition: "and",
              rules,
            });
          }
        } else if (col.type === TableColumnType.Enum) {
          filterTree.rules.push({
            condition: "or",
            rules: filterValues.map((value: string) => ({
              field: key,
              operator: "=",
              value: value,
              entity: col.entity,
            })),
          });
        } else if (col.type === TableColumnType.Text) {
          filterTree.rules.push({
            field: key,
            operator: "like",
            value: filterValues[0],
            entity: col.entity,
          });
        } else if (col.type === TableColumnType.Integer) {
          const [minValue, maxValue] = filterValues || [];
          const rules = [];
          if (minValue) {
            rules.push({
              field: key,
              operator: ">=",
              value: minValue,
              entity: col.entity,
            });
          }
          if (maxValue) {
            rules.push({
              field: key,
              operator: "<=",
              value: maxValue,
              entity: col.entity,
            });
          }
          if (rules.length > 0) {
            filterTree.rules.push({
              condition: "and",
              rules,
            });
          }
        } else if (col.type === TableColumnType.Boolean) {
          const value = filterValues[0];
          if (value) {
            filterTree.rules.push({
              field: key,
              operator: "=",
              value: value === "true",
              entity: col.entity,
            });
          }
        }
      }
    });

    return JSON.stringify(filterTree);
  };

  const fetchData = async (
    page = 1,
    pageSize = 10,
    filters: any = {},
    sorter: any = {}
  ) => {
    const params: any = {
      page,
      pageSize,
      filters: buildFilterTree(filters),
    };

    if (sorter.order) {
      params.sortField = sorter.field;
      params.sortOrder = sorter.order === "ascend" ? "ASC" : "DESC";
    }

    const response = await onFetchData(params);

    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize,
      total: response?.total,
    }));
  };

  const handleTableChange: TableProps<any>["onChange"] = async (
    pagination,
    filters,
    sorter
  ) => {
    const clearedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value?.length > 0)
    );

    setFilters(clearedFilters);
    setSorter(sorter);
    await fetchData(
      pagination.current,
      pagination.pageSize,
      clearedFilters,
      sorter
    );
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize, filters, sorter);
  }, []);

  return (
    <Spin spinning={loading}>
      <Table
        size="small"
        columns={columns}
        dataSource={dataSource}
        scroll={{ y: 400 }}
        bordered
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
        onRow={onRow} // Pass the onRow prop to Ant Design's Table
      />
    </Spin>
  );
};

export default CustomTable;
