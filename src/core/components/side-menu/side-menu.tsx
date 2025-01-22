import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BarChartOutlined,
  InfoCircleOutlined,
  ApartmentOutlined,
  UserOutlined,
  TeamOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

interface SideMenuProps {
  activeMenu?: string;
  onMenuChange?: (key: string) => void;
  collapsed: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleMenuClick = (e: any) => {
    navigate(e.key);
  };

  const menuItems = [
    {
      key: "/",
      icon: <BarChartOutlined style={{ color: "#6c6c6c" }} />,
      label: "Dashboard",
    },
    {
      key: "/org-info",
      icon: <InfoCircleOutlined style={{ color: "#6c6c6c" }} />,
      label: "Organization Information",
    },
    {
      key: "/org-chart",
      icon: <ApartmentOutlined style={{ color: "#6c6c6c" }} />,
      label: "Organization Chart",
    },
    {
      key: "/user",
      icon: <UserOutlined style={{ color: "#6c6c6c" }} />,
      label: "User Management",
    },
    {
      key: "/user-group",
      icon: <TeamOutlined style={{ color: "#6c6c6c" }} />,
      label: "User Groups",
    },
    {
      key: "/system",
      icon: <AppstoreOutlined style={{ color: "#6c6c6c" }} />,
      label: "Systems",
    },
    {
      key: "/entities",
      icon: <DatabaseOutlined style={{ color: "#6c6c6c" }} />,
      label: "Entities",
    },
  ];

  return (
    <Menu
      mode="inline"
      selectedKeys={[currentPath]} // تنظیم کلید فعال براساس مسیر فعلی
      onClick={handleMenuClick}
      style={{ fontSize: "11px" }}
      items={menuItems}
    />
  );
};

export default SideMenu;
