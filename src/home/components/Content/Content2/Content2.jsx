import React from "react";
import { useEffect, useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

const Content2 = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [-300, 350]);
  return (
    <div
      className="ba"
      ref={ref}
      style={{
        y,
        display: "flex",
        flexWrap: "wrap",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="ssas"
        style={{
          margin: "0% 20%  20% 20%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ paddingTop: "10%", paddingBottom: "10%" }}>Title</h2>
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
      </div>
    </div>
  );
};

export default Content2;
