import { createRef } from "react";
import axios from "axios";
import makeToast from "../Toaster";

const Login = () => {
  const handleRegister = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    axios
      .post("/user/register", {
        name,
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        makeToast("success", res.data.message);
      })
      .catch((err) => {
        console.log(err);
        makeToast("error", err.res.data.message);
      });
  };

  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();

  return (
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
  );
};

export default Login;
