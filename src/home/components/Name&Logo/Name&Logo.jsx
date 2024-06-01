import React from "react";
import logo_light from "../../../img/logo_light.png";
import logo_dark from "../../../img/logo_dark.png";
import { useRef } from "react";
import {  useTransform, useScroll } from "framer-motion";
import { useTheme } from "../../../context/dark-mode";
import "./name&logo.css";

const NameAndLogo = () => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 0.5], [-300, 350]);

  const logo = theme === "dark" ? logo_dark : logo_light;

  return (
    <div className="NameLogo-Container" data-aos="" ref={ref} style={{ y }}>
      <div className="NameLogo-Positioning">
        <div className="Image-Container">
          <img className="Img_NameLogo" src={logo} alt="" />
        </div>
        <div className="Name-Container">
          <div className="Name-Style">ChatApp</div>
        </div>
      </div>
    </div>
  );
};

export default NameAndLogo;