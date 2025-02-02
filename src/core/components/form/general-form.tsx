import React, { useEffect, useState } from "react";
import { Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { deleteRequest, getRequest } from "../../services/apiService.ts";
import Toolbar from "../toolbar/toolbar.tsx";
import CustomTable from "../table/table.tsx";
import { ColumnFactory } from "../column/column-factory.tsx";
import buttonData from "../../models/button-data.ts";
import { useParams } from "react-router-dom";

const buttons: buttonData[] = [
  { id: 1, label: "Save", type: "primary" },
  { id: 2, label: "Delete", type: "danger", hasConfirm: true },
  { id: 3, label: "Cancel", type: "primary" },
];

const GeneralForm: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<[]>([]);
  const [fields, setFields] = useState<[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const { reportId, objectId } = useParams();

  useEffect(() => {
    alert(objectId);
    fetchMetaData();
    fetchData();
  }, [reportId, objectId]);

  const fetchData = async (params: any = {}) => {
    setLoading(true);
    try {
      params.reportId = reportId;
      const queryString = new URLSearchParams(params).toString();
      const response = await getRequest<{
        data: any[];
        total: number;
      }>(`/api/generic?${queryString}`);
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
        data: any[];
        total: number;
      }>(`/api/base/GetReportMetaData/${reportId}`);

      let cols: [] = [];
      response.data.forEach((col, index) => {
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
      setFields(cols);
      return response;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToolbarClick = (label: string, id: number) => {
    if (id === 1) {
      //   form.submit();
    }
    if (id === 3) {
      navigate("/");
    }
    if (id === 2) {
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
      title="Form"
      type="inner"
      extra={
        <Toolbar buttonData={buttons} onButtonClick={handleToolbarClick} />
      }
    >
      {contextHolder}
    </Card>
  );
};

export default GeneralForm;
