import React, { useState } from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";
import { Menu, Dropdown, Icon, Modal } from "antd";
import { Row, Col } from "../components/Flexbox";
import Session from "../utils/Session";
import { useAccount, setAccount } from "../SharedState";
import ChangePassword from "./ChangePassword";
import LeanCloud from "../utils/LeanCloud";

const Bar = styled(Row)`
  padding: 0 10px;
  height: 60px;
  border-bottom: 1px solid rgb(238, 238, 238);
`;

const NavItems = styled(Row)`
  font-size: 14px;
  a {
    color: rgb(45, 53, 58);
    text-decoration: none;
    margin: 0 10px;
    line-height: 30px;
  }
`;

function logout() {
  Session.logout();
  window.location = "/login";
}

async function switchRole(account, roleId) {
  setAccount(account);
  Session.login(account);
  const result = await LeanCloud.queryObjects("_Role", {
    where: JSON.stringify({ objectId: { $in: account.roles } }),
  });
  if (result.status == 200) {
    const roles = result.data.results;
    const currentRole = _.find(roles, role => role.objectId == roleId) || _.first(roles);
    const isAdmin = _.some(roles, role => role.name == "SuperAdmin");
    const newAccount = {
      ...account,
      ..._.pick(currentRole, ["range", "leadPerms", "userPerms", "salePerms", "settingsPerms"]),
      roleId: currentRole.objectId,
      isAdmin,
      roleList: _.map(roles, role => _.pick(role, ["objectId", "display"])),
    };
    setAccount(newAccount);
    Session.login(newAccount);
    localStorage.setItem("currentRole", currentRole.objectId);
  }
}

function menu(setPasswordForm) {
  return (
    <Menu>
      <Menu.Item key="0" onClick={() => setPasswordForm({ visible: true })}>
        修改密码
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={logout}>
        退出登录
      </Menu.Item>
    </Menu>
  );
}

function roleMenu(account, setCurrentRoleId) {
  return (
    <Menu>
      {account.roleList.map(role => (
        <Menu.Item
          key={role.objectId}
          onClick={() => {
            setCurrentRoleId(role.objectId);
            switchRole(account, role.objectId);
          }}
        >
          {role.display}
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default ({ icon }) => {
  const account = useAccount();
  const [passwordForm, setPasswordForm] = useState({ visible: false });
  const [currentRoleId, setCurrentRoleId] = useState(localStorage.getItem("currentRole"));
  const currentRole = _.find(account.roleList, role => role.objectId == currentRoleId);
  return (
    <Bar valign="middle" align="right">
      <Row id="left" valign="middle">
        {icon}
      </Row>
      <Row grow={1} />
      <NavItems valign="middle">
        {account && (
          <Dropdown overlay={menu(setPasswordForm)} trigger={["click"]}>
            <a className="ant-dropdown-link" href="#">
              {account.name} <Icon type="down" />
            </a>
          </Dropdown>
        )}
        {account && account.roles.length > 1 && (
          <>
            <span>|</span>
            <Dropdown overlay={roleMenu(account, setCurrentRoleId)} trigger={["click"]}>
              <a className="ant-dropdown-link" href="#">
                {currentRole.display} <Icon type="down" />
              </a>
            </Dropdown>
          </>
        )}
      </NavItems>
      <Modal
        title="修改密码"
        width={550}
        visible={passwordForm.visible}
        onCancel={() => setPasswordForm({ visible: false })}
        footer={null}
        destroyOnClose
      >
        <ChangePassword account={account} close={() => setPasswordForm({ visible: false })} />
      </Modal>
    </Bar>
  );
};
