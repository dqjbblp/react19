import { useEffect, useMemo, useRef } from "react";
import girl from "../assets/girl.webp";

const Observer = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const io = useMemo(() => {
    return new IntersectionObserver(
      (e) => {
        e.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("段落进入屏幕");
            if (imgRef.current) {
              imgRef.current.src = imgRef.current.dataset.src || "";
            }
          } else {
            console.log("段落离开屏幕");
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.4,
      }
    );
  }, []);

  useEffect(() => {
    const currentRef = ref.current;

    if (currentRef) {
      io.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        io.unobserve(currentRef);
      }
    };
  }, [io]);

  return (
    <div
      ref={ref}
      style={{ width: "100%", height: "auto", backgroundColor: "#f0f0f0" }}
    >
      <div>该dom在被监听</div>
      <img ref={imgRef} loading="lazy" data-src={girl} />
    </div>
  );
};

export default Observer;
