import React from "react";
import { Select } from "antd";
import _ from "lodash";

export function createOptions(valueNameMap) {
  return _.map(valueNameMap, (label, value) => ({ label, value }));
}

export function createValueOptions(values) {
  return _.map(values, value => ({ label: value, value }));
}

export function createNumberOptions(numberNameMap) {
  return _.orderBy(
    _.map(numberNameMap, (label, value) => ({
      label,
      value: _.toNumber(value),
    })),
    "value"
  );
}

export default function({ name, options, formData, onChange, children, ...other }) {
  return (
    <Select
      name={name}
      value={formData && formData[name]}
      onChange={onChange && (value => onChange(name, value))}
      {...other}
    >
      {children}
      {options &&
        options.map(({ label, value }) => (
          <Select.Option key={label} value={value}>
            {label}
          </Select.Option>
        ))}
    </Select>
  );
}
