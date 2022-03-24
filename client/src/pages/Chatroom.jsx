import { useParams } from "react-router-dom";

const Chatroom = () => {
  const { id } = useParams();
  console.log(id);
  return <div>Chatroom Page</div>;
};

export default Chatroom;
