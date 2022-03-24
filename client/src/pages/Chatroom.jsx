import { useParams, useLocation } from "react-router-dom";
import io from "socket.io-client";

const Chatroom = () => {
  const { id } = useParams();
  const socket = io("http//localhost:8080", {
    query: {
      token: localStorage.getItem("CC_Token"),
    },
  });

  return <div>Chatroom Page</div>;
};

export default Chatroom;
