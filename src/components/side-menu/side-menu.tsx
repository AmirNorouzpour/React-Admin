import React from "react";
import "./side-menu.css";
import {
  SettingOutlined,
  UserOutlined,
  HomeOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

interface SideMenuProps {
  collapsed: boolean;
  activeMenu: string;
  onMenuChange: (key: string) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({
  collapsed,
  activeMenu,
  onMenuChange,
}) => {
  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[activeMenu]}
      inlineCollapsed={collapsed}
      onClick={(e) => onMenuChange(e.key)}
    >
      <Menu.Item key="1" icon={<HomeOutlined />}>
        Dashboard
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        User Managment
      </Menu.Item>
      <Menu.Item key="3" icon={<ApartmentOutlined />}>
        Org Chart
      </Menu.Item>
      <Menu.Item key="4" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
    </Menu>
  );
};

export default SideMenu;
