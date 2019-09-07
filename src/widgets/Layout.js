import React, { useState } from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "../components/Router";
import Topbar from "../widgets/Topbar";
import { useAccount } from "../SharedState";

const { Header, Sider, Content } = Layout;

function getNavItems(account) {
  let items = [
    {
      title: "工作台",
      icon: "calendar",
      link: "/dashboard",
    },
    {
      title: "线索管理",
      icon: "unordered-list",
      link: "/leads/list",
    },
  ];
  if (account.salePerms?.length > 0) {
    items.push({
      title: "业绩管理",
      icon: "bar-chart",
      link: "/sales/list",
    });
  }
  if (account.settingsPerms?.length > 0) {
    items.push({
      title: "系统配置",
      icon: "setting",
      link: "/system/setting",
    });
  }
  if (account.isAdmin) {
    items.push({
      title: "角色管理",
      icon: "safety",
      link: "/role/list",
    });
  }
  if (account.userPerms?.length > 0) {
    items.push({
      title: "用户管理",
      icon: "user",
      link: "/user/list",
    });
  }
  return items;
}

export default props => {
  if (typeof location === "undefined") return null;
  const [collapsed, setCollapsed] = useState(false);
  const account = useAccount();
  if (account == null) return null;
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname.split("/")[1]]}>
          {getNavItems(account).map(item => (
            <Menu.Item key={item.link.split("/")[1]}>
              <Link to={item.link}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content>
        <Header style={{ background: "#fff", padding: 0 }}>
          <Topbar
            icon={
              <Icon
                className="trigger"
                type={collapsed ? "menu-unfold" : "menu-fold"}
                onClick={() => setCollapsed(!collapsed)}
              />
            }
          />
        </Header>
        {props.children}
      </Content>
    </Layout>
  );
};
