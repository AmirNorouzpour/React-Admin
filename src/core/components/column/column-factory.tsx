import { Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import TextFilter from "../custom-filter/text-fileld.tsx";
import DateRangeFilter from "../custom-filter/date-range-field.tsx";
import EnumFilter from "../custom-filter/enum-field.tsx";
import NumericFilter from "../custom-filter/numeric-field.tsx";
import BooleanFilter from "../custom-filter/boolean-field.tsx"; // Boolean filter component
import { format } from "date-fns";
import React from "react";
import { TableColumnType } from "../../models/column-types.ts";

export class ColumnFactory {
  static createColumn({
    title,
    dataIndex,
    key,
    type,
    entity,
    hidden,
    filterKeyName,
    responsive,
    sorter = false,
    width,
    options = [],
  }: {
    title: string;
    dataIndex: string;
    key: string;
    type: TableColumnType;
    entity: string;
    sorter?: boolean;
    hidden?: boolean;
    responsive?: [];
    width?: number;
    filterKeyName?: string;
    options?: Array<{ label: string; value: string }>;
  }) {
    switch (type) {
      case TableColumnType.Text:
        return {
          title,
          dataIndex,
          key,
          entity,
          type,
          sorter,
          filterKeyName,
          responsive,
          width,
          hidden,
          showSorterTooltip: false,
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
          entity,
          filterKeyName,
          type,
          hidden,
          sorter,
          width,
          responsive,
          showSorterTooltip: false,
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
            date ? format(new Date(date), "yyyy-MM-dd") : "N/A",
        };
      case TableColumnType.Enum:
        const colors = [
          "indigo",
          "blue",
          "green",
          "red",
          "orange",
          "yellow",
          "purple",
          "lime",
          "gold",
          "geekblue",
          "violet",
          "#f50",
          "cyan",
          "magenta",
          "brown",
        ];
        return {
          title,
          dataIndex,
          key,
          entity,
          responsive,
          filterKeyName,
          type,
          hidden,
          width,
          sorter,
          showSorterTooltip: false,
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
            let color = colors[value % 10];
            const option = options.find((opt) => opt.value === String(value));
            return <Tag color={color}>{option?.label}</Tag>;
          },
        };
      case TableColumnType.Integer:
        return {
          title,
          dataIndex,
          key,
          entity,
          filterKeyName,
          responsive,
          width,
          type,
          hidden,
          sorter,
          showSorterTooltip: false,
          filterDropdown: (props: any) => (
            <NumericFilter
              value={props.selectedKeys[0] ? props.selectedKeys[0] : null}
              onChange={(value) => {
                props.setSelectedKeys(value ? value : []);
              }}
              onConfirm={props.confirm}
              onReset={props.clearFilters}
            />
          ),
          filterIcon: (filtered: boolean) => (
            <SearchOutlined
              style={{ color: filtered ? "#1890ff" : undefined }}
            />
          ),
          render: (value: number) =>
            value !== undefined ? value.toLocaleString() : "N/A",
        };
      case TableColumnType.Boolean:
        return {
          title,
          dataIndex,
          key,
          entity,
          filterKeyName,
          responsive,
          type,
          width,
          hidden,
          sorter,
          showSorterTooltip: false,
          filterDropdown: (props: any) => (
            <BooleanFilter
              value="true"
              options={[
                { label: "Yes", value: "true" },
                { label: "No", value: "false" },
              ]}
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
          render: (value: boolean) => {
            const option = options.find((opt) => opt.value === String(value));
            return <Tag color={value ? "blue" : "red"}>{option?.label}</Tag>;
          },
        };
      default:
        return {};
    }
  }
}
