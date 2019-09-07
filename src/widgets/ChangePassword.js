import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import schema from "schm";
import { Button, message } from "antd";
import { navigate } from "@reach/router";
import TextInput from "../components/TextInput";
import ErrorMessage from "../components/ErrorMessage";
import useFormData from "../hooks/useFormData";
import LeanCloud from "../utils/LeanCloud";
import Session from "../utils/Session";

const Table = styled.table`
  width: 100%;
  td {
    padding: 10px 30px 10px 10px;
    text-align: left;
    width: 100%;
    input {
      width: 180px;
    }
  }
  th {
    white-space: nowrap;
    padding: 10px 10px 10px 30px;
    text-align: right;
  }
  .required {
    color: red;
  }
`;

function Required() {
  return <span className="required">*</span>;
}

const Space = styled.span`
  display: inline-block;
  width: 4em;
`;

const passwordSchema = schema({
  old_password: {
    type: String,
    required: [true, "原密码必填"],
  },
  new_password: {
    type: String,
    required: [true, "新密码必填"],
    minlength: [8, "格式错误，密码必须由数字和字母组成，长度8位"],
    validate: [
      value => !value.match(/^[A-Za-z]+$/) && !value.match(/^[0-9]+$/),
      "格式错误，密码必须由数字和字母组成，长度8位",
    ],
  },
  confirm_password: {
    type: String,
    required: [true, "确认新密码必填"],
  },
});

export async function updatePassword(account, formData, setErrors, close) {
  try {
    await passwordSchema.validate(formData);
  } catch (errors) {
    setErrors(errors);
    return false;
  }
  const { old_password, new_password, confirm_password } = formData;
  if (new_password != confirm_password) {
    setErrors([{ param: "confirm_password", message: "两次输入的新密码不一致" }]);
    return false;
  }
  const result = await LeanCloud.updatePassword(account.objectId, { old_password, new_password });
  if (result.status === 200) {
    account.sessionToken = result.data.sessionToken;
    Session.login(account);
    message.info("修改密码成功");
    close();
    navigate("/login");
    return true;
  } else {
    if (result.data.code == 210) {
      message.error("原密码错误");
    } else {
      message.error("修改密码失败");
    }
    return false;
  }
}

export default ({ account, close }) => {
  const [formData, updateFormData] = useFormData({});
  const [errors, setErrors] = useState({});
  const onInputChange = (field, value) => {
    updateFormData(field, value);
    setErrors({});
  };
  return (
    <Table>
      <tbody>
        <tr>
          <th>
            <Required />
            原密码
          </th>
          <td>
            <TextInput
              placeholder="请输入原密码"
              name="old_password"
              type="password"
              formData={formData}
              onChange={onInputChange}
            />
            <ErrorMessage name="old_password" errors={errors} />
          </td>
        </tr>
        <tr>
          <th>
            <Required />
            新密码
          </th>
          <td>
            <TextInput
              placeholder="请输入新密码"
              name="new_password"
              type="password"
              formData={formData}
              onChange={onInputChange}
            />
            <ErrorMessage name="new_password" errors={errors} />
          </td>
        </tr>
        <tr>
          <th>
            <Required />
            确认新密码
          </th>
          <td>
            <TextInput
              placeholder="请再次输入新密码"
              name="confirm_password"
              type="password"
              formData={formData}
              onChange={onInputChange}
            />
            <ErrorMessage name="confirm_password" errors={errors} />
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ textAlign: "center" }}>
            <Button type="default" onClick={close}>
              取消
            </Button>
            <Space />
            <Button
              type="primary"
              onClick={() => updatePassword(account, formData, setErrors, close)}
            >
              确定
            </Button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};
