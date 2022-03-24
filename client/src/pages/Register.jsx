import { createRef } from "react";
import axios from "axios";
import Toast from "../Toast";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    axios
      .post("http://localhost:8080/auth/register", {
        name,
        email,
        password,
      })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          toast.error(error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();

  return (
    <div>
      <Toast />
      <div className="card">
        <div className="cardHeader">Registration</div>
        <div className="cardBody">
          <div className="inputGroup">
            <label htmlFor="name">Name</label>
            <input
              type="test"
              name="name"
              id="name"
              placeholder="John Doe"
              ref={nameRef}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="abc@example.com"
              ref={emailRef}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your Password"
              ref={passwordRef}
            />
          </div>
          <button onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
