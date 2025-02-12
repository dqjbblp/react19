import { Outlet, useParams } from "react-router-dom";
import useUserStore from "./Store/userUserStore";

const User = () => {
  const { userId } = useParams();

  const { userName, setName } = useUserStore();

  return (
    <div>
      <p>
        user:{userId}:{userName}
      </p>
      <button onClick={() => setName("hy is handsome")}>
        change user name
      </button>
      <Outlet />
    </div>
  );
};
export default User;
