import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
const GsapDemo = () => {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref1.current) {
      gsap.to(ref1.current, {
        x: 500,
        duration: 3,
        // repeat: -1,
        // yoyo: true,
        scrollTrigger: {
          trigger: ref1.current,
          start: "top 10%",
          end: "top 7",
          scrub: true,
          markers: true,
        },
      });
    }
  }, [ref1]);

  useEffect(() => {
    if (ref2.current) {
      gsap.fromTo(
        ref2.current,
        {
          x: 0,
        },
        {
          x: 500,
          duration: 5,
          scrollTrigger: {
            trigger: ref2.current,
            start: "top 60%",
            end: "top 20%",
            scrub: true,
            // markers: true,
          },
        }
      );
    }
  }, [ref2]);

  //时间线动画
  useEffect(() => {
    if (ref3.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref3.current,
          // markers: true,
          scrub: true,
          start: "top 70%",
          end: "top 30%",
        },
      });
      tl.to(ref3.current, {
        x: 500,
        duration: 5,
      })
        .to(ref3.current, {
          y: 200,
          duration: 3,
        })
        .to(ref3.current, {
          x: 0,
          duration: 5,
        })
        .to(ref3.current, {
          y: 0,
          duration: 3,
        });
    }
  }, [ref3]);

  return (
    <div style={{ height: 1000 }}>
      <div style={{ height: "100dvh", backgroundColor: "blue" }}>
        <div
          style={{ width: 160, height: 28, background: "purple" }}
          ref={ref1}
        />
      </div>

      <div style={{ height: "100dvh", backgroundColor: "pink" }}>
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 999,
            backgroundColor: "orange",
          }}
          ref={ref2}
        />
      </div>

      <div style={{ height: "100dvh", backgroundColor: "red" }}>
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 999,
            backgroundColor: "orange",
          }}
          ref={ref3}
        />
      </div>
    </div>
  );
};

export default GsapDemo;
