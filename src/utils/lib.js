import _ from "lodash";

export function insertSeparator(array, sep) {
  if (array === null || array.length < 2) return array;
  let result = new Array(array.length * 2 - 1);
  for (let i = 0; i < array.length; i++) {
    result[i * 2] = array[i];
    if (i < array.length - 1) {
      result[i * 2 + 1] = _.isFunction(sep) ? sep(i) : sep;
    }
  }
  return result;
}

export function maskPhoneNumber(phone) {
  return phone ? [phone.slice(0, 3), phone.slice(7)].join("****") : "";
}
