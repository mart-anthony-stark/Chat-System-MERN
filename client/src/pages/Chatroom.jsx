import { useParams, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Chatroom = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const { id } = useParams();
  const messageRef = useRef();
  const [userId, setUserId] = useState("");

  const handleSend = () => {
    const msg = messageRef.current.value;

    if (socket) {
      socket.emit("chatroomMessage", {
        chatroomId: id,
        message: msg,
      });
    }

    messageRef.current.value = "";
  };

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", { chatroomId: id });
    }
    return () => {
      if (socket) socket.emit("leaveRoom", { chatroomId: id });
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    }
    if (socket) {
      socket.on("newMessage", (message) => {
        const newMessages = [...messages, message];
        setMessages(newMessages);
      });
    }
  }, [messages]);

  return (
    <div className="chattroomPage">
      <div className="chatroomSection">
        <div className="cardHeader">Chatroom Page</div>
        <div className="chatroomContent">
          {messages.map((msg, i) => (
            <div className="message" key={i}>
              <span
                className={userId == msg.user ? "ownMessage" : "otherMessage"}
              >
                {msg.name}:{" "}
              </span>{" "}
              {msg.message}
            </div>
          ))}
        </div>
        <div className="chatroomActions">
          <div>
            <input
              type="text"
              name="message"
              placeholder="Say something..."
              ref={messageRef}
            />
          </div>
          <div>
            <div className="join" onClick={handleSend}>
              Send
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatroom;
