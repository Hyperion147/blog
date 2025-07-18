import { useRef, useEffect, useState } from "react";

const BackgroundSVG = (props) => {

  const pathRef1 = useRef(null);
  const [offset1, setOffset1] = useState(0);
  const [length1, setLength1] = useState(0);
  const pathRef2 = useRef(null);
  const [offset2, setOffset2] = useState(0);
  const [length2, setLength2] = useState(0);

  useEffect(() => {
    if (pathRef1.current) {
      const totalLength = pathRef1.current.getTotalLength();
      setLength1(totalLength);
      setOffset1(totalLength);
      let start = null;
      function animate(ts) {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / 1200, 1)
        setOffset1(totalLength * (progress - 1));
        if (progress < 1) requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
    }
  }, []);

  useEffect(() => {
    if (pathRef2.current) {
      const totalLength = pathRef2.current.getTotalLength();
      setLength2(totalLength);
      setOffset2(totalLength);
      let start = null;
      function animate(ts) {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / 1200, 1)
        setOffset2(totalLength * (1 - progress));
        if (progress < 1) requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
    }
  }, []);

  return (
    <svg
      width="100%"
      height="100%"
      className="absolute -z-20"
    >
      <path
        ref={pathRef1}
        d="M980 140 L700 140"
        stroke="black"
        fill="transparent"
        strokeWidth="2"
        strokeDasharray={length1}
        strokeDashoffset={offset1}
      />
      <path
        ref={pathRef2}
        d="M710 220 L550 220"
        stroke="black"
        fill="transparent"
        strokeWidth="2"
        strokeDasharray={length2}
        strokeDashoffset={offset2}
      />
    </svg>
  );
};

export default BackgroundSVG; 