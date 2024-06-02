import {  useRef } from "react";
import {  useTransform, useScroll } from "framer-motion";
import "./Content1.css";
import Phone from "../../../../img/phone-home.png";

const Content1 = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  return (
    <div className="Content1-Container" data-aos="fade-up">
       <div className="Content1-Container-Text">
         <div >
           <img className="Content1-Image" src={Phone} alt="" />
         </div>
       </div>
    </div>
  );
};

export default Content1;
