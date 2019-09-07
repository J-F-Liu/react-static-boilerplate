import React, { useState, useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";
import schema from "schm";
import { navigate } from "@reach/router";
import { Button, Input } from "antd";
import { Row } from "../components/Flexbox";
import ValidationMessages from "../widgets/ValidationMessages";
import Session from "../utils/Session";
import { setAccount } from "../SharedState";

export const Container = styled(Row)`
  min-height: 100%;
  align-items: center;
  background: linear-gradient(135deg, rgba(243, 195, 35, 1) 0%, rgba(238, 143, 59, 1) 100%);
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
  padding: 27px 96px 50px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 15px 20px 26px 0px rgba(190, 92, 1, 0.35);
  border-radius: 10px;
  input {
    width: 300px;
    height: 50px;
    background: rgba(247, 247, 247, 1);
    border-radius: 5px;
  }
  h1 {
    text-align: center;
    font-size: 35px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(45, 53, 58, 1);
    line-height: 49px;
    margin-bottom: 0;
    img {
      width: 110px;
      height: 50px;
    }
    p {
      margin: 19px 0 22px;
    }
  }
  .ant-input:hover {
    border-color: #43a735;
  }
  .ant-input:focus {
    border-color: #43a735;
  }
  .ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {
    border-color: #43a735;
  }
  .ant-btn-primary {
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    background-color: #43a735;
    border-color: #43a735;
  }
  .ant-btn-primary:hover,
  .ant-btn-primary:focus {
    opacity: 0.8;
  }
  .ant-input-suffix {
    .ant-btn-link {
      color: #43a735;
    }
    .ant-btn-link:hover {
      opacity: 0.8;
    }
  }
  .messages {
    .ant-btn-link {
      margin-top: 12px;
      color: rgba(172, 177, 180, 1);
    }
    .ant-btn-link:hover {
      color: rgba(112, 117, 120, 1);
    }
  }
  .mobileLogin {
    margin-bottom: 40px;
    display: none;
    background-color: #009688;
    border-color: #009688;
  }
  @media only screen and (max-width: 1024px) {
    padding: 57px 27px 50px;
    .mobileLogin {
      display: block;
    }
  }
`;

const InputRow = styled(Row)`
  background-color: #f7f7f7;
  margin-top: 10px;
`;

const Footer = styled.footer`
  margin-top: 65px;
  margin-bottom: 30px;
  color: #acb1b4;
  font-size: 14px;
  text-align: center;
`;

const userSchema = schema({
  username: {
    type: String,
    required: [true, "请输入手机号"],
    match: [/^1[3-9]\d{9}$/, "请输入正确的手机号"],
  },
  password: {
    type: String,
    required: [true, "请输入密码"],
    minlength: [8, "密码至少8位"],
  },
});

function getLoginErrorMessage(result) {
  switch (result.status) {
    case 500:
      return "服务器拒绝访问";
    case 504:
      return "服务器超时未响应";
    default:
      switch (result.data.code) {
        case 210:
          return "密码错误";
        case 211:
          return "手机号未注册";
        default:
          return result.data.error;
      }
  }
}

async function switchRole(account, roleId) {
  setAccount(account);
  Session.login(account);
}

async function loginByPassword(formData, setErrors, nextPage) {
  try {
    const { username, password } = await userSchema.validate(formData);
    const result = await LeanCloud.login(username, password);
    if (result.status == 200) {
      const account = result.data;
      if (account.enabled) {
        const roleId = localStorage.getItem("currentRole") || _.first(account.roles);
        await switchRole(account, roleId);
      } else {
        throw [{ param: "login", message: "账号已被禁用" }];
      }
    } else {
      const message = getLoginErrorMessage(result);
      throw [{ param: "login", message }];
    }
    navigate(nextPage);
  } catch (errors) {
    console.log(errors);
    setErrors(_.keyBy(errors, "param"));
  }
}

export default () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  return (
    <Container grow={1} align="center">
      <LoginForm onSubmit={e => e.preventDefault()}>
        <h1>
          <img src={require("../images/logo.png")} />
          <p>系统登录</p>
        </h1>
        <InputRow nowrap valign="middle">
          <Input
            placeholder="手机号"
            value={username}
            onChange={e => {
              if (e.target.value.match(/^[0-9]*$/)) {
                setUsername(e.target.value);
                setErrors({});
              }
            }}
            autoFocus
          />
        </InputRow>
        <InputRow nowrap valign="middle">
          <Input
            type="password"
            placeholder="密码"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setErrors({});
            }}
          />
        </InputRow>
        <Row className="messages" space="between">
          <ValidationMessages messages={errors} icon={<img src={require("../images/x.png")} />} />
          <Button type="link" size="small" onClick={() => navigate("/reset_password")}>
            忘记密码
          </Button>
        </Row>
        <Button
          className="mobileLogin"
          type="primary"
          size="large"
          onClick={() => loginByPassword({ username, password }, setErrors, "./leads/new")}
        >
          移动端登录
        </Button>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          onClick={() => loginByPassword({ username, password }, setErrors, "./dashboard")}
        >
          立即登录
        </Button>
      </LoginForm>
      <Footer />
    </Container>
  );
};
