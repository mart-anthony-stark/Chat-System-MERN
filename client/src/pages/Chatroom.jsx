import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Chatroom = ({ socket }) => {
  const { id } = useParams();

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
            <input type="text" name="message" placeholder="Say something..." />
          </div>
          <div>
            <div className="join">Send</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatroom;
