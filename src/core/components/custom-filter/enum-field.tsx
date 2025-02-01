import React from "react";
import { Row, Col, Checkbox, Space, Button, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface EnumFilterProps {
  options?: Array<{ label: string; value: string }>; // مقدار پیش‌فرض اختیاری
  selectedKeys?: string[]; // مقدار پیش‌فرض اختیاری
  setSelectedKeys: (keys: string[]) => void;
  confirm: () => void;
  clearFilters: () => void;
}

const EnumFilter: React.FC<EnumFilterProps> = ({
  options = [], // مقدار پیش‌فرض برای جلوگیری از undefined
  selectedKeys = [], // مقدار پیش‌فرض برای جلوگیری از undefined
  setSelectedKeys,
  confirm,
  clearFilters,
}) => {
  return (
    <div style={{ padding: 8, width: 200 }}>
      <Row>
        {options.map((option) => (
          <Col span={24} key={option.value}>
            <Checkbox
              checked={selectedKeys.includes(option.value)}
              onChange={(e) => {
                const newValue = e.target.checked
                  ? [...selectedKeys, option.value]
                  : selectedKeys.filter((v) => v !== option.value);
                setSelectedKeys(newValue);
              }}
            >
              <Tag color={option?.color}> {option.label}</Tag>
            </Checkbox>
          </Col>
        ))}
      </Row>
      <Space style={{ marginTop: 8 }}>
        <Button
          type="primary"
          onClick={() => {
            confirm();
          }}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Apply
        </Button>
        <Button
          onClick={() => {
            clearFilters(); // پاک کردن فیلترها
            confirm(); // بستن Dropdown
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

export default EnumFilter;
