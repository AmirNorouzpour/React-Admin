import React from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BarChartOutlined,
  InfoCircleOutlined,
  ApartmentOutlined,
  UserOutlined,
  TeamOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

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
      icon: <BarChartOutlined />,
      label: "Dashboard",
    },
    {
      key: "/org-info",
      icon: <InfoCircleOutlined />,
      label: "Organization Information",
    },
    {
      key: "/org-chart",
      icon: <ApartmentOutlined />,
      label: "Organization Chart",
    },
    {
      key: "/user",
      icon: <UserOutlined />,
      label: "User Management",
    },
    {
      key: "/system",
      icon: <AppstoreOutlined />,
      label: "Systems",
    },
    {
      key: "/user-groups",
      icon: <TeamOutlined />,
      label: "User Groups",
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
