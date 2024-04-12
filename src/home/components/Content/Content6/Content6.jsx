import React from "react";
import { useEffect, useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

const Content6 = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [-300, 350]);
  return <div className="" ref={ref} style={{ y }}></div>;
};

export default Content6;
