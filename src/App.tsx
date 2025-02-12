import { Link } from "react-router-dom";
import SelfRouter from "./Router";

const App = () => {
  const changeTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
  };

  return (
    <div className={"flex flex-col flex-1"}>
      <header
        className={"gap-5 bg-[#ffc0cb] w-full flex items-center h-[100px]"}
      >
        <div className={"flex gap-3 flex-1"}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/user/1">User 1</Link>
          <Link to="/user/2/hy">User hy</Link>
          <Link to="/gsap">Gsap</Link>
          <Link to="/r19">R19</Link>
          <Link to="/r19/transition">R18--useTransition</Link>
          <Link to="/r19/myActions">R19--actions</Link>
        </div>

        <button className={"justify-end"} onClick={changeTheme}>
          改变主题色
        </button>
      </header>

      <div className={"flex-1 bg-theme"}>
        <SelfRouter />
      </div>
    </div>
  );
};

export default App;
