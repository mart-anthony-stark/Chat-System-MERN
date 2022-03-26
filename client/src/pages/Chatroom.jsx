import { useParams, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Chatroom = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const { id } = useParams();
  const messageRef = useRef();
  
  const handleSend = () => {
    const msg = messageRef.current.value;
    console.log(msg);

    messageRef.current.value = "";
  };

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", { chatroomId: id });

      socket.on("newMessage", ({ message, userId, name }) => {
        setMessages([...messages, { message, name }]);
      });
    }
    return () => {
      if (socket) socket.emit("leaveRoom", { chatroomId: id });
    };
  }, [socket]);

  return (
    <div className="chattroomPage">
      <div className="chatroomSection">
        <div className="cardHeader">Chatroom Page</div>
        <div className="chatroomContent">
          <div className="message">
            <span className="otherMessage">Kit:</span> Hello Guys
          </div>
          <div className="message">
            <span className="ownMessage">Mart:</span> Hello kit
          </div>
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
