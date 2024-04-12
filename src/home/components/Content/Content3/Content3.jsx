import React from "react";
import { useRef } from "react";
import { useTransform, useScroll } from "framer-motion";
import DeviceScreen from "../../../../img/device-screen-resize.png";
import './Content3.css';

const Content3 =()=>{
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [-300, 350]);
  
    return (
      <div className="Content3-Container" 
      div data-aos="fade-up"
      data-aos-offset="100"
      // data-aos-easing="ease-in-sine"
      ref={ref} style={{ y }}>
      <img className="Content3-Image" src={DeviceScreen} alt="" />
      </div>
    )
}

export default Content3;