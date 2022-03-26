import { useRef } from "react";
import Toast from "../Toast";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setupSocket }) => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    axios
      .post("http://localhost:8080/auth/login", {
        email,
        password,
      })
      .then((res) => {
        toast.success(res.data.message);
        localStorage.setItem("CC_Token", res.data.token);
        navigate("/");
        setupSocket();
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

  return (
    <div>
      <Toast />
      <div className="card">
        <div className="cardHeader">Login</div>
        <div className="cardBody">
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
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
