import swal from "sweetalert";
import ReactDOM from "react-dom";

export default class Dialog {
  static show(dialog, options) {
    const wrapper = document.createElement("div");
    ReactDOM.render(dialog, wrapper, () => {
      swal({
        content: wrapper.firstChild,
        ...options,
      });
    });
  }

  static close = swal.close;
  static setActionValue = swal.setActionValue;
}
