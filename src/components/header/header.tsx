import React, { useState } from "react";
import { Col, Row } from "antd";
import "./header.css";
import {
  UserOutlined,
  NotificationOutlined,
  TaobaoCircleOutlined,
  MessageOutlined,
  HomeOutlined,
  QrcodeOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Button, Popover } from "antd";
import SystemMenu from "./../sys-menu/sys-menu.tsx";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Row className="header">
      <Col className="header-box" span={12}>
        <div className="org">
          <div className="org-box">
            <div style={{ fontSize: "16px" }}>
              <HomeOutlined />
            </div>
            <span className="org-title">Organization</span>
          </div>
          <Popover
            content={
              <div>
                <SystemMenu />
              </div>
            }
            title="Systems"
            trigger="hover"
            placement="bottomLeft"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <div className="sys-menu">
              <div style={{ fontSize: "16px" }}>
                <QrcodeOutlined />
              </div>
              <div className="sys-title">
                Systems{" "}
                <div className="sys-expand">
                  <DownOutlined />
                </div>
              </div>
            </div>
          </Popover>
        </div>
      </Col>
      <Col className="header-box right-content" span={12}>
        <Button
          className="header-btn"
          type="default"
          shape="circle"
          size="small"
          icon={<UserOutlined />}
        />
        <Button
          className="header-btn"
          type="default"
          shape="circle"
          size="small"
          icon={<NotificationOutlined />}
        />
        <Button
          className="header-btn"
          type="default"
          shape="circle"
          size="small"
          icon={<MessageOutlined />}
        />
        <Button
          className="header-btn"
          type="default"
          shape="circle"
          size="small"
          icon={<TaobaoCircleOutlined />}
        />
      </Col>
    </Row>
  );
};

export default Header;
