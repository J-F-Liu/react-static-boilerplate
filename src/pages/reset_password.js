import React, { useState, useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";
import schema from "schm";
import { navigate } from "@reach/router";
import { Button } from "antd";
import { Row } from "../components/Flexbox";
import TextInput from "../components/TextInput";
import CountdownButton from "../components/CountdownButton";
import ValidationMessages from "../widgets/ValidationMessages";
// import LeanCloud from "../utils/LeanCloud";
// import { randomString } from "../utils/lib";
import useFormData from "../hooks/useFormData";
import { Container, LoginForm } from "./login";

const InputRow = styled(Row)`
  background-color: #f7f7f7;
  margin-top: 10px;
`;

const NewPassword = styled.p`
  margin-top: 40px;
  text-align: center;
`;

const Footer = styled.footer`
  margin-top: 65px;
  margin-bottom: 30px;
  color: #acb1b4;
  font-size: 14px;
  text-align: center;
`;

const phoneSchema = schema({
  phone: {
    type: String,
    required: [true, "请输入手机号"],
    match: [/^1[3-9]\d{9}$/, "请输入正确的手机号"],
  },
});

const codeSchema = schema(phoneSchema, {
  smsCode: {
    type: String,
    required: [true, "请输入验证码"],
  },
});

async function sendSmsCode(formData, setErrors) {
  try {
    const { phone } = await phoneSchema.validate(formData);
    const result = await LeanCloud.requestPasswordResetBySmsCode(phone);
    if (result.status == 200) {
      return true;
    } else {
      const message = getErrorMessage(result.data);
      throw [{ param: "login", message }];
    }
  } catch (errors) {
    console.log(errors);
    setErrors(_.keyBy(errors, "param"));
  }
}

function getErrorMessage(data) {
  switch (data.code) {
    case 213:
      return "手机号未注册";
    case 215:
      return "手机号未验证";
    case 603:
      return "验证码错误";
    default:
      return data.error;
  }
}

async function resetPassword(formData, setErrors, setPassword) {
  try {
    const { smsCode } = await codeSchema.validate(formData);
    const password = randomString(8);
    const result = await LeanCloud.resetPasswordBySmsCode(password, smsCode);
    if (result.status == 200) {
      setPassword(password);
    } else {
      const message = getErrorMessage(result.data);
      throw [{ param: "login", message }];
    }
  } catch (errors) {
    console.log(errors);
    setErrors(_.keyBy(errors, "param"));
  }
}

export default () => {
  const [formData, updateFormData] = useFormData({});
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState(null);
  const onInputChange = (field, value) => {
    if (value.match(/^[0-9]*$/)) {
      updateFormData(field, value);
      setErrors({});
    }
  };
  return (
    <Container grow={1} align="center">
      <LoginForm onSubmit={e => e.preventDefault()}>
        <h1>
          <p>忘记密码</p>
        </h1>
        <InputRow nowrap valign="middle">
          <TextInput
            placeholder="请输入手机号"
            name="phone"
            formData={formData}
            onChange={onInputChange}
            autoFocus
            suffix={
              <CountdownButton
                type="link"
                size="small"
                seconds={60}
                onClick={() => sendSmsCode(formData, setErrors)}
              >
                验证码
              </CountdownButton>
            }
          />
        </InputRow>
        <InputRow nowrap valign="middle">
          <TextInput
            placeholder="请输入验证码"
            name="smsCode"
            formData={formData}
            onChange={onInputChange}
          />
        </InputRow>
        {password == null ? (
          <>
            <ValidationMessages messages={errors} icon={<img src={require("../images/x.png")} />} />
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              onClick={() => resetPassword(formData, setErrors, setPassword)}
            >
              提交
            </Button>
          </>
        ) : (
          <>
            <NewPassword>新密码：{password}</NewPassword>
            <Button type="primary" size="large" onClick={() => navigate("/login")}>
              去登录
            </Button>
          </>
        )}
      </LoginForm>
      <Footer />
    </Container>
  );
};
