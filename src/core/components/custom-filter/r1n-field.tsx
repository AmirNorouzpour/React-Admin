import React, { useEffect, useState } from "react";
import { Input, Button, Space, Select, Spin, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getRequest } from "../../services/apiService.ts";

interface R1NFilterProps {
  typeDefId: string;
  selectedKeys?: string[];
  setSelectedKeys: (keys: string[]) => void;
  confirm: () => void;
  clearFilters: () => void;
}

const R1NFilter: React.FC<R1NFilterProps> = ({
  typeDefId,
  selectedKeys,
  setSelectedKeys,
  confirm,
  clearFilters,
}) => {
  const [options, setOptions] = useState<[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    fetchData("");
  }, [typeDefId]);

  const onSearch = (str: string) => {
    fetchData(str);
  };

  const fetchData = async (searchText: string) => {
    try {
      setSearchLoading(true);
      let params = {};
      params.typeDefId = typeDefId;
      params.search = searchText;

      const queryString = new URLSearchParams(params).toString();
      const response = await getRequest<[]>(
        `/api/generic/lookUp?${queryString}`
      );
      setOptions(
        response.data.map((item) => ({
          label: item.title,
          value: item.id,
        }))
      );
    } catch (error: any) {
      console.error("Failed to fetch : " + error);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div style={{ padding: 8 }}>
      <Select
        mode="multiple"
        showSearch
        placeholder="Search and select"
        filterOption={false}
        maxTagCount={3}
        maxTagPlaceholder={(omittedValues) => (
          <Tooltip
            styles={{ root: { pointerEvents: "none" } }}
            title={omittedValues.map(({ label }) => label).join(", ")}
          >
            <span>...</span>
          </Tooltip>
        )}
        onSearch={onSearch}
        options={options}
        loading={searchLoading}
        placement={"topLeft"}
        notFoundContent={searchLoading ? <Spin size="small" /> : null}
        onChange={(ids) => {
          setSelectedKeys(ids);
        }}
        value={selectedKeys}
        allowClear
        style={{ marginBottom: 8, display: "block" }}
      />
      <Space>
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
            setSelectedKeys([]);
            clearFilters();
            confirm();
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

export default R1NFilter;
