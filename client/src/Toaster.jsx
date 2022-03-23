import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const makeToast = (type, msg) => {
  MySwal.fire({
    icon: type,
    title: msg,
    footer: "Copyright 2018",
    position: "top-end",
    didOpen: () => {
      // `MySwal` is a subclass of `Swal`
      //   with all the same instance & static methods
      MySwal.clickConfirm();
    },
  }).then(() => {
    return MySwal.fire(<p>{msg}</p>);
  });
};

export default makeToast;
