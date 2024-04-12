import React, { Suspense, useEffect } from 'react';
import "./main-page.css";
import "aos/dist/aos.css";
import Aos from "aos";
import { Header } from "./components/Header/header";
import { useTheme } from "../context/dark-mode";
import NameAndLogo from "./components/Name&Logo/Name&Logo";
import FooterMain from "./components/Footer/FooterMain";
import { useInView } from 'react-intersection-observer';

const Content1 = React.lazy(() => import('./components/Content/Content1/Content1'));
const Content2 = React.lazy(() => import('./components/Content/Content2/Content2'));
const Content3 = React.lazy(() => import('./components/Content/Content3/Content3'));

export const MainPage = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true, 
    rootMargin: '100px 0px', 
  });

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

return (
  <div className={`container-Home ${theme}`}>
    <Header />
    <NameAndLogo />
    <div ref={ref}>
      <Suspense fallback={<div>Loading ...</div>}>
        <div className="Description_Phone" >
          {inView && <Content1 />}
          {inView && <Content2 />}
        </div>
        {inView && <Content3 />}
        {inView && <FooterMain />}
      </Suspense>
    </div>
  </div>
);
};