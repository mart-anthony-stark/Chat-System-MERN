import { useParams, useLocation } from "react-router-dom";

const Chatroom = () => {
  const location = useLocation();
  const { id } = useParams();
  console.log(id);
  return <div>Chatroom Page</div>;
};

export default Chatroom;
