import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));
const User = lazy(() => import("./User"));
const UserName = lazy(() => import("./UserNames"));
const GsapDemo = lazy(() => import("./Gsap"));
const R19 = lazy(() => import("./r19"));
const TransItion = lazy(() => import("./r19/_useTransition"));
const MyAction = lazy(() => import("./r19/action"));
const MyUseActionState = lazy(() => import("./r19/MyUseActionsState"));
const MyUseActionStatePlus = lazy(() => import("./r19/useActionsStatePlus"));
const Optimistic = lazy(() => import("./r19/optimistic"));
const MyFormStatus = lazy(() => import("./r19/myFormStatus"));
const Component = lazy(() => import("./SomeComponents"));

const SelfRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/user/:userId" element={<User />}>
        <Route path=":username/:age" element={<UserName />} />
      </Route>
      <Route path="/gsap" element={<GsapDemo />} />
      <Route path="/r19" element={<R19 />}>
        <Route path="transition" element={<TransItion />} />
        <Route path="myActions" element={<MyAction />} />
        <Route path="myUseActionState" element={<MyUseActionState />} />
        <Route path="actionsPlus" element={<MyUseActionStatePlus />} />
        <Route path="optimistic" element={<Optimistic />} />
        <Route path="myformStatus" element={<MyFormStatus />} />
      </Route>
      <Route path="component" element={<Component />} />
    </Routes>
  );
};

export default SelfRouter;
