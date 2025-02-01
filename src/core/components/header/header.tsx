import React, { useState } from "react";
import { Avatar, Badge, Col, Row } from "antd";
import "./header.css";
import {
  UserOutlined,
  NotificationOutlined,
  GlobalOutlined,
  MessageOutlined,
  HomeOutlined,
  AppstoreOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";
import SystemMenu from "./../sys-menu/sys-menu.tsx";
import Langs from "../langs/langs.tsx";
import UserProfile from "../user-profile/user-profile.tsx";

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
                <SystemMenu setSystemMenu={setOpen} />
              </div>
            }
            title="Systems"
            trigger="click"
            placement="bottomLeft"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <div className="sys-menu">
              <div style={{ fontSize: "16px" }}>
                <AppstoreOutlined />
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
        <Popover
          content={
            <div>
              <UserProfile />
            </div>
          }
          title="Profile"
          trigger="click"
          placement="bottomLeft"
        >
          <Badge dot>
            <Avatar
              className="user-profile"
              size={28}
              icon={<UserOutlined />}
            />
          </Badge>
        </Popover>

        <Avatar
          className="user-profile header-btn"
          size={28}
          icon={<NotificationOutlined />}
        />

        <Avatar
          className="user-profile header-btn"
          size={28}
          icon={<MessageOutlined />}
        />

        <Popover
          content={
            <div>
              <Langs />
            </div>
          }
          title="Languages"
          trigger="click"
          placement="bottomLeft"
        >
          <Avatar
            className="user-profile header-btn"
            size={28}
            icon={<GlobalOutlined />}
          />
        </Popover>
      </Col>
    </Row>
  );
};

export default Header;
