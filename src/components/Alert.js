import swal from "sweetalert";

export default class Alert {
  static info(message, options) {
    return swal({
      icon: "info",
      text: message,
      ...options,
    });
  }

  static success(message, options) {
    return swal({
      icon: "success",
      text: message,
      ...options,
    });
  }

  static warning(message, options) {
    return swal({
      icon: "warning",
      text: message,
      ...options,
    });
  }

  static error(message, options) {
    return swal({
      icon: "error",
      text: message,
      ...options,
    });
  }
}
