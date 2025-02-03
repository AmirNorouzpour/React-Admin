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
  const [reportName, setReportName] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const { reportId } = useParams();

  useEffect(() => {
    fetchMetaData();
    fetchData();
  }, [reportId]);

  const fetchData = async (params: any = {}) => {
    setLoading(true);
    try {
      params.reportId = reportId;
      const queryString = new URLSearchParams(params).toString();
      const response = await getRequest<ApiResult<any>>(
        `/api/generic?${queryString}`
      );
      setData(response.data);
      return response;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMetaData = async (params: any = {}) => {
    setLoading(true);
    try {
      const response = await getRequest<{
        data: any;
        total: number;
      }>(`/api/base/GetReportMetaData/${reportId}`);

      let cols: [] = [];
      response.data.columns.forEach((col, index) => {
        let column = ColumnFactory.createColumn({
          title: col.title,
          dataIndex: col.dataIndex,
          key: col.key,
          type: col.type,
          sorter: col.sorter,
          entity: col.entity,
          hidden: col.hidden,
          typeDefId: col.relation?.typedefId,
          options: col.options,
        });
        cols.push(column);
      });
      setColumns(cols);
      debugger;
      setReportName(response.data.name);
      return response;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
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
      await deleteRequest(`/api/users`, ids); // ارسال شناسه‌ها به سرور
      messageApi.success("Users deleted successfully!");
      fetchData(); // به‌روزرسانی لیست پس از حذف
      setSelectedRowKeys([]); // پاک کردن انتخاب‌ها
    } catch (error) {
      console.error("Error deleting users:", error);
      messageApi.error("Failed to delete users. Please try again.");
    }
  };

  //   const columns = [
  //     ColumnFactory.createColumn({
  //       title: "Id",
  //       dataIndex: "Id",
  //       key: "id",
  //       type: TableColumnType.Text,
  //       sorter: true,
  //       entity: "dyn_Product",
  //       hidden: true,
  //     }),
  //     ColumnFactory.createColumn({
  //       title: "Caption",
  //       dataIndex: "Caption",
  //       key: "caption",
  //       type: TableColumnType.Text,
  //       sorter: true,
  //       entity: "dyn_Product",
  //     }),
  //     ColumnFactory.createColumn({
  //       title: "Insert Date",
  //       dataIndex: "InsertDateTime",
  //       key: "InsertDateTime",
  //       type: TableColumnType.DateTime,
  //       sorter: true,
  //       entity: "dyn_Product",
  //     }),
  //   ];

  return (
    <Card
      title={`${reportName}`}
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
