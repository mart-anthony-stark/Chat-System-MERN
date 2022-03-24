import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import io from "socket.io-client";

const Chatroom = () => {
  const { id } = useParams();
  useEffect(() => {
    const socket = io("http://localhost:8080", {
      query: {
        token: localStorage.getItem("CC_Token"),
      },
    });
    return () => {
      socket.off("message:new");
    };
  }, []);

  return <div>Chatroom Page</div>;
};

export default Chatroom;
