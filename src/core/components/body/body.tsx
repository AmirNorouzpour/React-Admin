import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import "./body.css";
import SideMenu from "../side-menu/side-menu.tsx";
import OrgChart from "../org-chart/org-chart.tsx";
import OrgForm from "../org-form/org-form.tsx";
import UserList from "../user/user-list.tsx";
import UserForm from "../user/user-form.tsx";
import SystemList from "../system/system-list.tsx";
import UserGroupList from "../user-group/user-group.tsx";
import TyepDefList from "../typedef/typedef-list.tsx";
import ReportsList from "../report/report-list.tsx";
import Dashboard from "../dashboard/dashboard.tsx";
import TypedefForm from "../typedef/typedef-form.tsx";
import { useSystemContext } from "../../../context/SystemContext.tsx";
import ReportBuilder from "../report-builder/form.tsx";

const { Sider, Content } = Layout;

const Body: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { selectedSystem, setSelectedSystem, systems } = useSystemContext();
  const { systemKey } = useParams(); // ✅ دریافت `systemKey` از `URL`

  // ✅ تنظیم `selectedSystem` از `URL` هنگام تغییر مسیر
  useEffect(() => {
    if (systemKey) {
      const systemFromList = systems.find((sys) => sys.key === systemKey);
      if (systemFromList) {
        setSelectedSystem(systemFromList);
      }
    }
  }, [systemKey, systems]);

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
          {!collapsed && (
            <div className="system-name">
              {selectedSystem ? selectedSystem.name : "Loading..."}
            </div>
          )}
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
            {/* ✅ مسیرهای `system-management` */}
            <Route path="system-management/" element={<Dashboard />} />
            <Route path="system-management/org-chart" element={<OrgChart />} />
            <Route
              path="system-management/org-chart/form"
              element={<OrgForm />}
            />
            <Route path="system-management/user" element={<UserList />} />
            <Route path="system-management/user/form" element={<UserForm />} />
            <Route path="system-management/system" element={<SystemList />} />
            <Route
              path="system-management/user-group"
              element={<UserGroupList />}
            />
            <Route path="system-management/report" element={<ReportsList />} />
            <Route path="system-management/typedef" element={<TyepDefList />} />
            <Route
              path="system-management/typedef/form"
              element={<TypedefForm />}
            />

            {/* ✅ مسیر `/system/:systemKey/list` برای نمایش `SystemList` */}
            <Route
              path="system/:systemKey/list/:reportId"
              element={<SystemList />}
            />
            <Route path="system/:systemKey" element={<Dashboard />} />
            <Route path="/report-builder" element={<ReportBuilder />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Body;
