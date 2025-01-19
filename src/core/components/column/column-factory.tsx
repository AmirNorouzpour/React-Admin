import { Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import TextFilter from "../custom-filter/text-fileld.tsx";
import DateRangeFilter from "../custom-filter/date-range-field.tsx";
import EnumFilter from "../custom-filter/enum-field.tsx";
import { format } from "date-fns";
import React from "react";
import { TableColumnType } from "../../models/column-types.ts";

export class ColumnFactory {
  static createColumn({
    title,
    dataIndex,
    key,
    type,
    sorter = false,
    options = [],
  }: {
    title: string;
    dataIndex: string;
    key: string;
    type: TableColumnType;
    sorter?: boolean;
    options?: Array<{ label: string; value: string }>;
  }) {
    switch (type) {
      case TableColumnType.Text:
        return {
          title,
          dataIndex,
          key,
          type,
          sorter,
          filterDropdown: (props: any) => (
            <TextFilter
              value={props.selectedKeys[0] || ""}
              onChange={(value) => props.setSelectedKeys([value])}
              onConfirm={props.confirm}
              onReset={props.clearFilters}
            />
          ),
          filterIcon: (filtered: boolean) => (
            <SearchOutlined
              style={{ color: filtered ? "#1890ff" : undefined }}
            />
          ),
        };
      case TableColumnType.DateTime:
        return {
          title,
          dataIndex,
          key,
          type,
          sorter,
          filterDropdown: (props: any) => (
            <DateRangeFilter
              value={
                props.selectedKeys[0] ? props.selectedKeys[0].split(",") : null
              }
              onChange={(value) =>
                props.setSelectedKeys(value ? [value.join(",")] : [])
              }
              onConfirm={props.confirm}
              onReset={props.clearFilters}
            />
          ),
          filterIcon: (filtered: boolean) => (
            <SearchOutlined
              style={{ color: filtered ? "#1890ff" : undefined }}
            />
          ),
          render: (date: string) =>
            date ? format(new Date(date), "yyyy/MM/dd") : "N/A",
        };
      case TableColumnType.Enum:
        return {
          title,
          dataIndex,
          key,
          type,
          sorter,
          filterDropdown: (props: any) => (
            <EnumFilter
              options={options}
              selectedKeys={props.selectedKeys as string[]}
              setSelectedKeys={props.setSelectedKeys}
              confirm={props.confirm}
              clearFilters={props.clearFilters}
            />
          ),
          filterIcon: (filtered: boolean) => (
            <SearchOutlined
              style={{ color: filtered ? "#1890ff" : undefined }}
            />
          ),
          render: (value: number) => {
            const option = options.find((opt) => opt.value === String(value));
            if (option?.label === "Male") return <Tag color="blue">Male</Tag>;
            if (option?.label === "Female")
              return <Tag color="pink">Female</Tag>;
            return <Tag color="default">Unknown</Tag>;
          },
        };
    }
  }
}
