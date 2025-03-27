import { useParams } from "react-router-dom";

const UserName = () => {
  const { username, age } = useParams();

  return (
    <div>
      <p>
        userName:{username} -- age:{age}
      </p>
    </div>
  );
};

export default UserName;
