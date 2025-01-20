import React, { useState } from "react";
import { Button, InputNumber, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface NumericFilterProps {
  value?: string[] | null;
  onChange: (value: string[] | null) => void;
  onConfirm: () => void;
  onReset: () => void;
}

const NumericFilter: React.FC<NumericFilterProps> = ({
  value,
  onChange,
  onConfirm,
  onReset,
}) => {
  const [min, setMin] = useState<string | null>(value?.[0] || null);
  const [max, setMax] = useState<string | null>(value?.[1] || null);

  return (
    <div style={{ padding: 8 }}>
      <Space direction="vertical" size="small">
        <InputNumber
          placeholder="Min value"
          value={min !== null ? parseFloat(min) : undefined}
          onChange={(value) => setMin(value !== null ? value.toString() : null)}
          style={{ width: "100%" }}
        />
        <InputNumber
          placeholder="Max value"
          value={max !== null ? parseFloat(max) : undefined}
          onChange={(value) => setMax(value !== null ? value.toString() : null)}
          style={{ width: "100%" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              // Send updated values to the parent
              if (min || max) {
                onChange([min || "", max || ""]);
              } else {
                onChange(null);
              }
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
              setMin(null);
              setMax(null);
              onReset();
              onConfirm();
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </Space>
    </div>
  );
};

export default NumericFilter;
