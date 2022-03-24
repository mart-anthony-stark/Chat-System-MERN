import { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [chatrooms, setChatrooms] = useState([]);
  useEffect(() => {
    getChatrooms();
  }, []);
  const getChatrooms = async () => {
    axios
      .get("http://localhost:8080/chatroom", {
        headers: {
          authorization: `bearer ${localStorage.getItem("CC_Token")}`,
        },
      })
      .then((res) => {
        setChatrooms(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card">
      <div className="cardHeader">Chatrooms</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="chatroomName">Chatroom Name</label>
          <input
            type="text"
            name="chatroomName"
            id="chatroomName"
            placeholder="ChatterBox"
          />
        </div>
        <button>Create Chatroom</button>
        <div className="chatrooms">
          {chatrooms.map((room) => (
            <div className="chatroom" key={room._id}>
              <div>{room.name}</div>
              <div className="join">Join</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
