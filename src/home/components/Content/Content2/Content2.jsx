import React from "react";
import {useRef } from "react";
import {useTransform, useScroll } from "framer-motion";
import "./Content2.css";

const Content2 = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [-300, 350]);
  return (
    <div data-aos="zoom-in-up"
      className="ba"
      ref={ref}
      style={{y}}
    >
      <div
        className="content2-ContainerText">
        <h2 className="h2_Content2" >Title</h2>
        <p className="text_Content2">
        orem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
        asperiores omnis dicta nisi. Quasi iusto pariatur voluptate quod,
        dolores animi sint optio sunt consequuntur deleniti amet vel, ex tenetur
        veniam. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Nesciunt asperiores omnis dicta nisi. Quasi iusto pariatur voluptate
        quod, dolores animi sint optio sunt consequuntur deleniti amet vel, ex
        tenetur veniam. Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Nesciunt asperiores omnis dicta nisi. Quasi iusto pariatur
        voluptate quod, dolores animi sint optio sunt consequuntur deleniti amet
        vel, ex tenetur veniam.
        </p>
      </div>
    </div>
  );
};

export default Content2;
