import { Outlet, useParams } from "react-router-dom";
import useUserStore from "./Store/userUserStore";

const User = () => {
  const { userId } = useParams();

  const { userName, setName } = useUserStore();

  return (
    <div>
      <div className={"h-20 w-full bg-green-200"}>fake tableBar</div>
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
