import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  BarChartOutlined,
  InfoCircleOutlined,
  ApartmentOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";

interface SideMenuProps {
  activeMenu?: string;
  onMenuChange?: (key: string) => void;
  collapsed: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ collapsed }) => {
  const navigate = useNavigate();

  const handleMenuClick = (e: any) => {
    navigate(e.key);
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["/"]}
      onClick={handleMenuClick}
      style={{ fontSize: "11px" }}
    >
      <Menu.Item key="/" icon={<BarChartOutlined />}>
        Dashboard
      </Menu.Item>
      <Menu.Item key="/org-info" icon={<InfoCircleOutlined />}>
        Organization Information
      </Menu.Item>
      <Menu.Item key="/org-chart" icon={<ApartmentOutlined />}>
        Organization Chart
      </Menu.Item>
      <Menu.Item icon={<UserOutlined />} key="/user">
        User Managemnet
      </Menu.Item>
      <Menu.Item key="/user-groups" icon={<TeamOutlined />}>
        User Groups
      </Menu.Item>
    </Menu>
  );
};

export default SideMenu;
