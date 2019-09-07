import React from "react";
import { Input } from "antd";

export default function({ name, formData, onChange, ...other }) {
  return (
    <Input
      name={name}
      value={formData[name] || ""}
      onChange={onChange && (e => onChange(name, e.target.value))}
      {...other}
    />
  );
}
