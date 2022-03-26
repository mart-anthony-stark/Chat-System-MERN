import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
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

  const createChatroom = async () => {
    axios
      .post("http://localhost:8080/chatroom", {
        headers: {
          authorization: `bearer ${localStorage.getItem("CC_Token")}`,
        },
      })
      .then((res) => {
        setChatrooms(...chatrooms, res.data);
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
        <button onClick={createChatroom}>Create Chatroom</button>
        <div className="chatrooms">
          {chatrooms.map((room) => (
            <div className="chatroom" key={room._id}>
              <div>{room.name}</div>
              <Link to={`/chatroom/${room._id}`}>
                <div className="join">Join</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
