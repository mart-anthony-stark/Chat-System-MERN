import React from "react";

const Login = () => {
  return (
    <div className="card">
      <div className="cardHeader">Login</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
      </div>
    </div>
  );
};

export default Login;
