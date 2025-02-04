import {
  Alert,
  Avatar,
  Button,
  Card,
  Checkbox,
  Col,
  Empty,
  Form,
  Input,
  List,
  Row,
  Select,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { ApiResult } from "../../models/api-result.ts";
import { getRequest } from "../../services/apiService.ts";
import {
  UserOutlined,
  ApartmentOutlined,
  DeleteOutlined,
  TeamOutlined,
  PlusOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import VirtualList from "rc-virtual-list";
import "./typedef.css";

interface TypedefAuthorizationProps {
  typedefId: string;
  captionFieldDefId: string;
  setCaptionFieldDefId;
}

const TypedefAuthorization: React.FC<TypedefAuthorizationProps> = ({
  typedefId,
  captionFieldDefId,
  setCaptionFieldDefId,
}) => {
  const [ugcData, setugcData] = useState<[]>([]);
  const [selectedOrgId, setSelectedOrgId] = useState<string>("");
  const [selectedOrgData, setSelectedOrgData] = useState<any>([]);
  const [selectedUgc, setSelectedUgc] = useState<any>([]);
  const [data, setData] = useState<[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    fetchUgc();
  }, [typedefId]);

  const fetchUgc = async () => {
    try {
      const response = await getRequest<any>("/api/base/getAllUGC");
      setugcData(
        response.map((item) => ({
          label: item.name,
          value: item.id,
          type: item.type,
        }))
      );
    } catch (error: any) {
    } finally {
    }
  };

  const onSelectOrg = (org) => {
    setSelectedOrgId(org?.id);
    setSelectedOrgData(org);
  };

  const options = [
    { label: "Create", value: 1 },
    { label: "Read", value: 2 },
    { label: "Update", value: 4 },
    { label: "Delete", value: 8 },
  ];

  return (
    <Card
      style={{ minWidth: 100 }}
      size="small"
      type="inner"
      title={"Typedef Authorization"}
    >
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <div>
            <div>
              <Row gutter={10}>
                <Col xs={24} md={18}>
                  <Select
                    style={{ width: "100%" }}
                    showSearch
                    placeholder="Please choose the type"
                    onChange={(value, option) => {
                      debugger;
                      setSelectedUgc({
                        id: value,
                        name: option?.label,
                        type: option?.type,
                      });
                    }}
                    options={ugcData}
                    loading={searchLoading}
                    virtual={true}
                    optionFilterProp="label"
                    optionRender={(option) => {
                      let icon;
                      switch (option.data.type) {
                        case 1:
                          icon = (
                            <ApartmentOutlined style={{ color: "#52c41a" }} />
                          );
                          break;
                        case 2:
                          icon = (
                            <ContactsOutlined style={{ color: "#7890ff" }} />
                          );
                          break;
                        case 3:
                          icon = <TeamOutlined style={{ color: "#faad14" }} />;
                          break;
                        case 4:
                          icon = <UserOutlined style={{ color: "#777" }} />;
                          break;
                        default:
                          icon = null;
                      }

                      return (
                        <div style={{ display: "flex" }}>
                          <div> {icon}</div>
                          <div style={{ marginLeft: "10px" }}>
                            {option.label}
                          </div>
                        </div>
                      );
                    }}
                  />
                </Col>
                <Col xs={24} md={4}>
                  <Button
                    type="dashed"
                    onClick={() => {
                      setData((prevData) => {
                        if (!Array.isArray(prevData)) return [selectedUgc];
                        const existingIndex = prevData.findIndex(
                          (item) => item.id === selectedUgc.id
                        );
                        if (existingIndex >= 0) return [...prevData];
                        return [...prevData, selectedUgc];
                      });
                    }}
                    icon={<PlusOutlined />}
                  >
                    Add Item
                  </Button>
                </Col>
              </Row>
            </div>
            <div style={{ marginTop: 10 }}>
              <Row>
                <Col xs={24} md={24}>
                  <List bordered size="small">
                    {data?.length == 0 && (
                      <Empty
                        style={{
                          margin: "50px",
                        }}
                      />
                    )}
                    <VirtualList
                      data={data}
                      height={300}
                      itemHeight={47}
                      itemKey="email"

                      //   onScroll={onScroll}
                    >
                      {(item) => (
                        <div
                          className="auth-list-item"
                          onClick={() => onSelectOrg(item)}
                        >
                          <List.Item key={item.id}>
                            <List.Item.Meta
                              avatar={
                                <Avatar
                                  style={{
                                    backgroundColor: "#f0f2f5",
                                    color: "#777",
                                  }}
                                >
                                  {item?.type === 1 ? (
                                    <ApartmentOutlined
                                      style={{ color: "#52c41a" }}
                                    />
                                  ) : item?.type === 2 ? (
                                    <ContactsOutlined
                                      style={{ color: "#7890ff" }}
                                    />
                                  ) : item?.type === 3 ? (
                                    <TeamOutlined
                                      style={{ color: "#faad14" }}
                                    />
                                  ) : (
                                    <UserOutlined
                                      style={{ color: "#1890ff" }}
                                    />
                                  )}
                                </Avatar>
                              }
                              title={
                                <span
                                  style={{
                                    color: "#777",
                                    marginTop: "5px",
                                  }}
                                >
                                  {item.name}
                                </span>
                              }
                            />
                            <div>
                              {" "}
                              <Button
                                type="link"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setSelectedOrgId("");
                                  setData(
                                    data.filter((row) => row.id !== item.id)
                                  );
                                }}
                              />
                            </div>
                          </List.Item>
                        </div>
                      )}
                    </VirtualList>
                  </List>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <Col xs={24} md={12}>
          {selectedOrgId && (
            <div>
              <Alert
                message={`${selectedOrgData.name} CRUD Permission`}
                type="info"
                showIcon
              />
              <Row>
                <Checkbox.Group
                  style={{
                    backgroundColor: "#fafafa",
                    borderRadius: 10,
                    padding: "20px",
                    marginTop: 10,
                    width: "100%",
                  }}
                  options={options}
                  // defaultValue={selectedOrgData.auths}
                  // onChange={onChange}
                />
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default TypedefAuthorization;
