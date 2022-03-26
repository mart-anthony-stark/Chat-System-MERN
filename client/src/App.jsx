import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/index";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Chatroom from "./pages/Chatroom";
import io from "socket.io-client";
import Toast from "./Toast";
import { toast } from "react-toastify";

function App() {
  const [socket, setSocket] = useState(null);
  const setupSocket = () => {
    const token = localStorage.getItem("CC_Token");
    if (token && !socket) {
      const newSocket = io("http://localhost:8080", {
        query: {
          token,
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        toast.info("Socket Disconnected");
      });

      newSocket.on("connect", () => {
        toast.success("Socket Connected");
      });

      setSocket(newSocket);
    }
  };

  useEffect(() => {
    setupSocket();
  }, []);
  return (
    <div className="App">
      <Toast />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setupSocket={setupSocket} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard socket={socket} />} />
          <Route path="/chatroom/:id" element={<Chatroom socket={socket} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
