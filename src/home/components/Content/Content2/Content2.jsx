import React from "react";
import { useRef } from "react";
import { useTransform, useScroll } from "framer-motion";
import "./Content2.css";

const Content2 = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [-300, 350]);
  return (
    <div data-aos="zoom-in-up" className="ba" ref={ref} style={{ y }}>
      <div className="content2-ContainerText">
        <h1 className="h2_Content">
          <h1 className="h1-content2">Ce este ChatApp?</h1>
        </h1>
        <div className="text_Content2">
          <p className="p-home">
            ChatApp este o aplicație de socializare în continuă dezvoltare,
            creată pentru a facilita comunicarea între utilizatori. Pe această
            platformă, utilizatorii înregistrați pot interacționa cu o
            comunitate vastă, creând noi prietenii și legături sociale.
          </p>
          <h7>ChatApp oferă multiple modalități de comunicare:</h7>
          <ul>
            <li>
              <strong>Mesaje text:</strong> Puteți trimite mesaje instantanee
              prietenilor și noilor contacte.
            </li>
            <li>
              <strong>Apeluri video:</strong> Utilizatorii pot iniția apeluri
              video, creând camere virtuale la care alții se pot alătura pentru
              a conversa față în față.
            </li>
          </ul>
          <p className="p-home">
            În plus, ChatApp include un bot numit "ChatBot" cu care utilizatorii
            pot interacționa. Acest bot este capabil să învețe de la
            utilizatori, astfel încât experiența de utilizare să fie mereu
            îmbunătățită.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Content2;
