import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/index";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Chatroom from "./pages/Chatroom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chatroom/:id" element={<Chatroom />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
