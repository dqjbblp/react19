import { useEffect, useRef } from "react";
import { useIntersection } from "react-use";

const InfiniteScroll = () => {
  const divRef = useRef<HTMLDivElement>(null);

  const inter = useIntersection(divRef as React.RefObject<HTMLElement>, {
    threshold: 1,
  });

  useEffect(() => {
    console.log(inter?.intersectionRatio, "intttt");
  }, [inter?.intersectionRatio]);

  return (
    <div ref={divRef}>
      <div>测试可见div</div>
    </div>
  );
};

export default InfiniteScroll;
