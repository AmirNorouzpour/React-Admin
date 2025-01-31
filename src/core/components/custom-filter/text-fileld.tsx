import React from "react";
import { Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface TextFilterProps {
  value?: string;
  onChange: (value: string) => void;
  onConfirm: () => void;
  onReset: () => void;
}

const TextFilter: React.FC<TextFilterProps> = ({
  value = "",
  onChange,
  onConfirm,
  onReset,
}) => {
  return (
    <div style={{ padding: 8 }}>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search"
        style={{ marginBottom: 8, display: "block" }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => {
            onConfirm();
          }}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Apply
        </Button>
        <Button
          onClick={() => {
            onReset();
            onConfirm();
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

export default TextFilter;
