import { useParams } from "react-router-dom";

const UserName = () => {
  const { username } = useParams();

  return (
    <div>
      <p>userName:{username}</p>
    </div>
  );
};

export default UserName;
