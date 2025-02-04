import React, { useEffect, useState } from "react";
import { Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { deleteRequest, getRequest } from "../../services/apiService.ts";
import Toolbar from "../toolbar/toolbar.tsx";
import CustomTable from "../table/table.tsx";
import { ColumnFactory } from "../column/column-factory.tsx";
import buttonData from "../../models/button-data.ts";
import { useParams } from "react-router-dom";
import { ApiResult } from "../../models/api-result.ts";

const buttons: buttonData[] = [
  { id: 1, label: "New", type: "primary" },
  { id: 2, label: "Edit", type: "primary" },
  { id: 3, label: "Delete", type: "danger", hasConfirm: true },
];

const GeneralReport: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<[]>([]);
  const [columns, setColumns] = useState<[]>([]);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<any>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const { reportId } = useParams();

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      try {
        await fetchMetaData();
        await fetchData();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAsync();
  }, [reportId]);

  const fetchData = async (params: any = {}) => {
    try {
      params.reportId = reportId;
      const queryString = new URLSearchParams(params).toString();
      const response = await getRequest<ApiResult<any>>(
        `/api/generic?${queryString}`
      );
      setData(response.data);
      setReportData((prevData) => ({
        ...prevData,
        total: response.total,
      }));
      return response;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const fetchMetaData = async () => {
    try {
      const response = await getRequest<ApiResult<any>>(
        `/api/base/GetReportMetaData/${reportId}`
      );

      const cols = response.data.columns.map((col) =>
        ColumnFactory.createColumn({
          title: col.title,
          dataIndex: col.dataIndex,
          key: col.key,
          type: col.type,
          sorter: col.sorter,
          entity: col.entity,
          hidden: col.hidden,
          typeDefId: col.relation?.typedefId,
          options: col.options,
        })
      );

      setColumns(cols);
      setReportData(response.data.reportData);
      return response;
    } catch (error) {
      console.error("Failed to fetch metadata:", error);
    }
  };

  const handleToolbarClick = (label: string, id: number) => {
    if (id === 1) {
      navigate("form");
    }
    if (id === 2) {
      if (selectedRowKeys.length === 0) {
        messageApi.warning("Please select a user to edit.");
        return;
      }
      const selectedKey = selectedRowKeys[0];
      navigate("form/" + selectedKey, { state: { selectedKey } });
    }
    if (id === 3) {
      if (selectedRowKeys.length === 0) {
        messageApi.warning("Please select users to delete.");
        return;
      }
      deleteUsers(selectedRowKeys);
    }
  };

  const deleteUsers = async (ids: React.Key[]) => {
    try {
      await deleteRequest(`/api/users`, ids);
      messageApi.success("Users deleted successfully!");
      fetchData();
      setSelectedRowKeys([]);
    } catch (error) {
      console.error("Error deleting users:", error);
      messageApi.error("Failed to delete users. Please try again.");
    }
  };

  return (
    <Card
      title={` ${reportData?.name} (${reportData?.total})`}
      type="inner"
      extra={
        <Toolbar buttonData={buttons} onButtonClick={handleToolbarClick} />
      }
    >
      {contextHolder}
      <CustomTable
        columns={columns}
        dataSource={data}
        loading={loading}
        onFetchData={fetchData}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
        }}
        onRow={(record) => ({
          onDoubleClick: () => {
            navigate("form/" + record.Id, {
              state: { selectedKey: record.Id },
            });
          },
        })}
      />
    </Card>
  );
};

export default GeneralReport;
