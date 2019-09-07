import React from "react";
import { Input } from "antd";
import _ from "lodash";

export default function({ name, formData, onChange, ...other }) {
  return (
    <Input
      type="number"
      name={name}
      value={formData[name] || ""}
      onChange={onChange && (e => onChange(name, _.toNumber(e.target.value)))}
      {...other}
    />
  );
}
