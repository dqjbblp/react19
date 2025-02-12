import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));
const User = lazy(() => import("./User"));
const UserName = lazy(() => import("./UserNames"));
const GsapDemo = lazy(() => import("./Gsap"));
const R19 = lazy(() => import("./r19"));
const TransItion = lazy(() => import("./r19/_useTransition"));
const MyAction = lazy(() => import("./r19/action"));

const SelfRouter = () => {
  return (
    <Suspense
      fallback={
        <div style={{ width: "100vw", height: "100vh", background: "green" }}>
          Loading...
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:userId" element={<User />}>
          <Route path=":username" element={<UserName />} />
        </Route>
        <Route path="/gsap" element={<GsapDemo />} />
        <Route path="/r19" element={<R19 />}>
          <Route path="transition" element={<TransItion />} />
          <Route path="myActions" element={<MyAction />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default SelfRouter;
