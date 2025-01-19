import { Space, Button, DatePicker } from "antd";
import dayjs from "dayjs";
import { SearchOutlined } from "@ant-design/icons";
import React from "react";

const DateRangeFilter: React.FC<{
  value: [string, string] | null;
  onChange: (value: [string, string] | null) => void;
  onConfirm: () => void;
  onReset: () => void;
}> = ({ value, onChange, onConfirm, onReset }) => {
  const { RangePicker } = DatePicker;
  return (
    <div style={{ padding: 8 }}>
      <RangePicker
        value={
          value
            ? [
                value[0] ? dayjs(value[0]) : null,
                value[1] ? dayjs(value[1]) : null,
              ]
            : null
        }
        onChange={(dates) => {
          if (dates) {
            onChange([dates[0].toISOString(), dates[1].toISOString()]);
          } else {
            onChange(null);
          }
        }}
        style={{ marginBottom: 8, display: "block" }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => {
            onConfirm(); // تایید فیلتر
          }}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Apply
        </Button>
        <Button
          onClick={() => {
            onReset(); // بازنشانی مقدار
            onConfirm(); // بستن Dropdown
          }}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </Space>
    </div>
  );
};

export default DateRangeFilter;
