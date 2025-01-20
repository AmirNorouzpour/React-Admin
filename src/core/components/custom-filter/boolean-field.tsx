import React, { useState } from "react";
import { Tag, Space, Button } from "antd";

interface BooleanFilterProps {
  value?: string;
  options: Array<{ label: string; value }>;
  onChange: (value: string | null) => void;
  onConfirm: () => void;
  onReset: () => void;
}

const BooleanFilter: React.FC<BooleanFilterProps> = ({
  value,
  options,
  onChange,
  onConfirm,
  onReset,
}) => {
  const [selectedValue, setSelectedValue] = useState(value || "");

  const handleSelect = (val: string) => {
    setSelectedValue(val === selectedValue ? "" : val);
  };

  const handleConfirm = () => {
    onChange(selectedValue || null);
    onConfirm();
  };

  const handleReset = () => {
    setSelectedValue("");
    onChange(null);
    onReset();
    onConfirm();
  };

  return (
    <div style={{ padding: 8 }}>
      <Space direction="vertical" size="small">
        <Space wrap>
          {options.map((option) => (
            <Tag
              key={option.value}
              color={selectedValue === option.value ? "blue" : "default"}
              onClick={() => handleSelect(option.value)}
              style={{ cursor: "pointer" }}
            >
              {option.label}
            </Tag>
          ))}
        </Space>
        <Space>
          <Button type="primary" onClick={handleConfirm} size="small">
            Apply
          </Button>
          <Button onClick={handleReset} size="small">
            Reset
          </Button>
        </Space>
      </Space>
    </div>
  );
};

export default BooleanFilter;
