import { useEffect, useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import "./Content1.css";
import Phone from "../../../../img/phone.png";

const Content1 = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  return (
    <div className="Content1-Container" data-aos="fade-up">
       <div className="Content1-Container-Text">
         <div className="Content1-Text">
           <img src={Phone} alt="" />
         </div>
       </div>
    </div>
  );
};

export default Content1;
