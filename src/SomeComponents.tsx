import DatePicker from "./component/datePicker";
import Drag from "./component/drag";
import DragSort from "./component/dragSort";
import G2048 from "./component/G2048";
import HoverCard from "./component/hoverCard";
import InfiniteScroll from "./component/infiniteScroll";
import StepCircle from "./component/stepCircle";
import Flip from "./component/flip";
import Swiper from "./component/swaper";
import CanvasEle from "./canvas";
import ThreeD from "./component/threeD";
import WaterMask from "./component/waterMask";
import Radar from "./component/radar";
import NewModal from "./component/Modal.tsx";
import KeepAlive from "./component/KeepAlive/keepAlive.tsx";
import TestProvider from "./component/testProvider.tsx";
import FakeList from "./component/fakeList.tsx";

const SomeComponents = () => {
  return (
    <div className={"p-4 flex-1 h-full flex flex-col gap-4"}>
      <StepCircle />

      <div className={"flex justify-end flex-col"}>
        <InfiniteScroll />
      </div>

      <Drag />

      <DragSort />

      <DatePicker />

      <HoverCard />

      <G2048 />

      <Flip />

      <Swiper />

      <CanvasEle />

      <ThreeD />

      <WaterMask />

      <Radar />

      <div
        onClick={() =>
          NewModal.show({
            confirmBtn: true,
            msg: "123",
            emit: NewModal.hide,
          })
        }
      >
        点击弹窗
      </div>

      <KeepAlive />

      <TestProvider />

      <FakeList />
    </div>
  );
};

export default SomeComponents;
