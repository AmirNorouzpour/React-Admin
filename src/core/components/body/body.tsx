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
import GeneralReport from "../report/general-report.tsx";
import GeneralForm from "../form/general-form.tsx";

const { Sider, Content } = Layout;

const Body: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { selectedSystem, setSelectedSystem, systems } = useSystemContext();
  const { systemKey } = useParams();

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
            <div style={{ cursor: "pointer" }}>
              {collapsed ? (
                <MenuUnfoldOutlined style={{ color: "#696969" }} />
              ) : (
                <MenuFoldOutlined style={{ color: "#696969" }} />
              )}
            </div>
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
            {/* <Route path="" element={<Dashboard />} /> */}
            <Route path=":systemKey/org-chart" element={<OrgChart />} />
            <Route path=":systemKey/org-chart/form" element={<OrgForm />} />
            <Route path=":systemKey/user" element={<UserList />} />
            <Route path=":systemKey/user/form" element={<UserForm />} />
            <Route path=":systemKey/system" element={<SystemList />} />
            <Route path=":systemKey/user-group" element={<UserGroupList />} />
            <Route path=":systemKey/report" element={<ReportsList />} />
            <Route path=":systemKey/typedef" element={<TyepDefList />} />
            <Route path=":systemKey/typedef/form" element={<TypedefForm />} />

            <Route
              path=":systemKey/list/:reportId"
              element={<GeneralReport />}
            />
            <Route
              path=":systemKey/list/:reportId/form/:objectId?"
              element={<GeneralForm />}
            />
            <Route path=":systemKey" element={<Dashboard />} />
            <Route
              path=":systemKey/report-builder"
              element={<ReportBuilder />}
            />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Body;
