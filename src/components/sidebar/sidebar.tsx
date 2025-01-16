import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "./sidebar.css";
import SideMenu from "../side-menu/side-menu.tsx";

const { Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("1");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "1":
        return <h1>Dashboard</h1>;
      case "2":
        return <h1>User Managment</h1>;
      case "3":
        return <h1>Settings Content</h1>;
      default:
        return <h1>Welcome to the Dashboard</h1>;
    }
  };

  return (
    <Layout className="layout">
      <Sider
        className="sider"
        collapsible
        collapsed={collapsed}
        collapsedWidth={50}
        theme="light"
        trigger={null}
      >
        <div className={`sider-header ${collapsed ? "collapsed" : ""}`}>
          {!collapsed && <div className="logo">Basic Informations</div>}
          <div
            className={`collapse-button ${collapsed ? "collapsed" : ""}`}
            onClick={toggleCollapsed}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </div>

        <SideMenu
          collapsed={collapsed}
          activeMenu={activeMenu}
          onMenuChange={setActiveMenu}
        />
      </Sider>
      <Layout>
        <Content className="content">{renderContent()}</Content>
      </Layout>
    </Layout>
  );
};

export default App;
