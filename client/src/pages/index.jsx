import React from "react";
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (!token) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  }, []);
  return <div>Home Page</div>;
};

export default IndexPage;
