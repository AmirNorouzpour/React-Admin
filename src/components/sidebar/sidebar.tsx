import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("1"); // مدیریت محتوای فعال

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // محتوای مرتبط با هر آیتم منو
  const renderContent = () => {
    switch (activeMenu) {
      case "1":
        return <h1>Home Content</h1>;
      case "2":
        return <h1>Profile Content</h1>;
      case "3":
        return <h1>Settings Content</h1>;
      default:
        return <h1>Welcome to the Dashboard</h1>;
    }
  };

  return (
    <Layout style={{ minHeight: "90vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        collapsedWidth={80}
        theme="light"
        trigger={null}
        style={{ position: "relative" }}
      >
        {/* لوگو و دکمه باز/بسته */}
        <div
          style={{
            position: "relative",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #d9d9d9",
            padding: "0 16px",
          }}
        >
          {!collapsed && (
            <div
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#000",
                flex: 1,
              }}
            >
              Full Logo
            </div>
          )}
          <div
            style={{
              cursor: "pointer",
              fontSize: "18px",
              position: collapsed ? "absolute" : "relative",
              top: collapsed ? "50%" : "auto",
              left: collapsed ? "50%" : "auto",
              transform: collapsed ? "translate(-50%, -50%)" : "none",
            }}
            onClick={toggleCollapsed}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </div>

        {/* منو */}
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          inlineCollapsed={collapsed}
          onClick={(e) => setActiveMenu(e.key)} // تغییر محتوای فعال بر اساس کلید
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: "20px" }}>{renderContent()}</Content>
      </Layout>
    </Layout>
  );
};

export default App;
