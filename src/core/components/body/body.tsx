import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./body.css";
import SideMenu from "../side-menu/side-menu.tsx";
import OrgChart from "../org-chart/org-chart.tsx";
import OrgForm from "../org-form/org-form.tsx";
import UserList from "../user/user-list.tsx";
import UserForm from "../user/user-form.tsx";
import SystemList from "../system/system-list.tsx";
import UserGroupList from "../user-group/user-group.tsx";

const { Sider, Content } = Layout;

const Body: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Handle screen resizing for sidebar collapse
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuChange = (key: string) => {
    navigate(key);
  };

  return (
    <Layout className="layout">
      <Sider
        collapsible
        collapsed={collapsed}
        collapsedWidth={50}
        theme="light"
        trigger={null}
        className="sider"
      >
        <div className={`sider-header ${collapsed ? "collapsed" : ""}`}>
          {!collapsed && <div className="logo">Basic Information</div>}
          <div
            className={`collapse-button ${collapsed ? "collapsed" : ""}`}
            onClick={toggleCollapsed}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </div>
        <SideMenu
          activeMenu={null}
          onMenuChange={handleMenuChange}
          collapsed={collapsed}
        />
      </Sider>
      <Layout>
        <Content className="content">
          <Routes>
            <Route path="/" element={<h1>Welcome to the Dashboard</h1>} />
            <Route path="/org-chart" element={<OrgChart />} />
            <Route path="/org-chart/form" element={<OrgForm />} />
            <Route path="/user" element={<UserList />} />
            <Route path="/user/form" element={<UserForm />} />
            <Route path="/system" element={<SystemList />} />
            <Route path="/user-group" element={<UserGroupList />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Body;
