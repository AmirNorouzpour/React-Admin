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
  const currentPath = location.pathname;
  const { selectedSystem, systems } = useSystemContext();
  const [dynamicMenu, setDynamicMenu] = useState<MenuProps["items"]>([]);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  useEffect(() => {
    if (!selectedSystem && systems.length > 0) {
      navigate(`/${systems[0].key}`);
    }
  }, [selectedSystem, systems]);

  const systemManagementMenu: MenuProps["items"] = [
    {
      key: `/${selectedSystem?.key}/dashboard`,
      icon: <BarChartOutlined />,
      label: "Dashboard",
    },
    {
      key: `/${selectedSystem?.key}/org-info`,
      icon: <InfoCircleOutlined />,
      label: "Organization Information",
    },
    {
      key: `/${selectedSystem?.key}/org-chart`,
      icon: <ApartmentOutlined />,
      label: "Organization Chart",
    },
    {
      key: `/${selectedSystem?.key}/user`,
      icon: <UserOutlined />,
      label: "Users Management",
    },
    {
      key: `/${selectedSystem?.key}/user-group`,
      icon: <TeamOutlined />,
      label: "User Groups",
    },
    {
      key: `/${selectedSystem?.key}/system`,
      icon: <AppstoreOutlined />,
      label: "Systems",
    },
    {
      key: `/${selectedSystem?.key}/typedef`,
      icon: <DatabaseOutlined />,
      label: "Typedefs",
    },
    {
      key: `/${selectedSystem?.key}/report`,
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
        key: `/${selectedSystem.key}/${item.Path}`,
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
