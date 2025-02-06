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
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LottieMapper from "../../../assets/lottie/lottie-mapper.ts";
import IconPicker from "../icon-picker/icon-picker.tsx";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [icon, seticon] = useState("");

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Row className="header">
      <Col className="header-box" span={8} xs={12}>
        <div className="org">
          <div className="org-box">
            <div style={{ fontSize: "16px" }}>
              <HomeOutlined />
            </div>
            <span className="org-title">Norsou Solutions</span>
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
            <div className="sys-menu  header-btn">
              <div style={{ fontSize: "16px" }}>
                <AppstoreOutlined />
              </div>
              <div className="sys-title ">
                Systems
                <div className="sys-expand">
                  <DownOutlined />
                </div>
              </div>
            </div>
          </Popover>
        </div>
      </Col>
      <Col className="header-box" span={8} xs={0}>
        <div
          style={{
            fontSize: "16px",
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            color: "#fff",
            paddingLeft: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Popover
            content={
              <div>
                <IconPicker
                  OnSelect={(i) => {
                    debugger;
                    seticon(i);
                  }}
                />
              </div>
            }
            title="Icons"
            trigger="click"
            placement="bottomLeft"
          >
            <div>
              System{" "}
              {icon && (
                <i className={`fa-solid ${icon}`} style={{ marginLeft: 5 }}></i>
              )}
            </div>
          </Popover> */}
          <div className="header-btn">System</div>
          <div className="header-btn">Entity</div>
          <div className="header-btn">Report</div>
          <div className="header-btn">Code</div>
          <div className="header-btn">Workflow</div>
          <div className="header-btn">API</div>
        </div>
      </Col>
      <Col span={8} xs={12}>
        <div className="header-box right-content" style={{ display: "flex" }}>
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
            <div>
              <DotLottieReact
                src={LottieMapper.GetFile("user")}
                loop
                autoplay
                style={{ width: 36, height: 36 }}
              />
            </div>
          </Popover>

          <Avatar
            className="user-profile header-btn"
            size={32}
            icon={<NotificationOutlined />}
          />

          <Avatar
            className="user-profile header-btn"
            size={32}
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
              size={32}
              icon={<GlobalOutlined />}
            />
          </Popover>
        </div>
      </Col>
    </Row>
  );
};

export default Header;
