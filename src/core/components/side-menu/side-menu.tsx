import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BarChartOutlined,
  InfoCircleOutlined,
  ApartmentOutlined,
  UserOutlined,
  TeamOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
  FileDoneOutlined,
  EditOutlined,
  FormOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, MenuProps } from "antd";
import { useSystemContext } from "../../../context/SystemContext.tsx";
import { getRequest } from "../../services/apiService.ts";

interface SideMenuProps {
  collapsed: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedSystem } = useSystemContext();
  const currentPath = location.pathname;
  const [dynamicMenu, setDynamicMenu] = useState<MenuProps["items"]>([]);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  const systemManagementMenu: MenuProps["items"] = [
    {
      key: `/system-management/dashboard`,
      icon: <BarChartOutlined />,
      label: "Dashboard",
    },
    {
      key: `/system-management/org-info`,
      icon: <InfoCircleOutlined />,
      label: "Organization Information",
    },
    {
      key: `/system-management/org-chart`,
      icon: <ApartmentOutlined />,
      label: "Organization Chart",
    },
    {
      key: `/system-management/user`,
      icon: <UserOutlined />,
      label: "Users Management",
    },
    {
      key: `/system-management/user-group`,
      icon: <TeamOutlined />,
      label: "User Groups",
    },
    {
      key: `/system-management/system`,
      icon: <AppstoreOutlined />,
      label: "Systems",
    },
    {
      key: `/system-management/typedef`,
      icon: <DatabaseOutlined />,
      label: "Typedefs",
    },
    {
      key: `/system-management/report`,
      icon: <FileDoneOutlined />,
      label: "Reports",
    },
  ];

  const fetchSystemMenu = async () => {
    if (!selectedSystem || selectedSystem.name === "System Management") {
      setDynamicMenu([]);
      return;
    }
    try {
      const response = await getRequest<any[]>(
        `/api/systems/menu/${selectedSystem.key}`
      );
      const menus: MenuProps["items"] = response.data.map((item) => ({
        key: `/system/${selectedSystem.key}/${item.Path}`,
        icon: <AppstoreOutlined />,
        label: item.Title,
      }));
      setDynamicMenu(menus);
    } catch (error) {
      console.error("Error fetching system menu:", error);
    }
  };

  useEffect(() => {
    fetchSystemMenu();
  }, [selectedSystem]);

  const generalContextMenu: MenuProps["items"] = [
    { label: "New Report", key: "newReport", icon: <BarChartOutlined /> },
    { label: "New Form", key: "newForm", icon: <FormOutlined /> },
  ];

  const itemContextMenu: MenuProps["items"] = [
    { label: "Edit", key: "edit", icon: <EditOutlined /> },
    { label: "Remove", key: "delete", icon: <DeleteOutlined /> },
    { label: "Refresh", key: "refresh", icon: <ReloadOutlined /> },
  ];

  const handleContextMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "newReport") {
      navigate("/report-builder");
    } else if (key === "newForm") {
      console.log("Creating New Form...");
    }
  };

  return (
    <Dropdown
      menu={{ items: generalContextMenu, onClick: handleContextMenuClick }}
      trigger={["contextMenu"]}
    >
      <div style={{ height: "100%", minHeight: "100vh" }}>
        <Menu
          mode="inline"
          selectedKeys={[currentPath]}
          onClick={handleMenuClick}
          style={{ fontSize: "11px" }}
          items={
            selectedSystem?.name === "System Management"
              ? systemManagementMenu
              : dynamicMenu
          }
        />
      </div>
    </Dropdown>
  );
};

export default SideMenu;
