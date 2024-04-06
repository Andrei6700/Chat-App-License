import "./main-page.css";
import "aos/dist/aos.css";
import Aos from "aos";
import { Header } from "./components/Header/header";
import { useTheme } from "../context/dark-mode";
import { useEffect } from "react";
import NameAndLogo from "./components/Name&Logo/Name&Logo";
import Content1 from "./components/Content/Content1/Content1";
import Content2 from "./components/Content/Content2/Content2";
import Content3  from './components/Content/Content3/Content3'
// import Content4  from './components/Content/Content4/Content4';
// import Content5  from "./components/Content/Content5/Content5";
// import Content6  from "./components/Content/Content6/Content6";
import  FooterMain   from "./components/Footer/FooterMain";

export const MainPage = () => {
  const { theme } = useTheme();
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className={`container-Home ${theme}`}>
      <Header />
      <NameAndLogo />
      <div className="" style={{width:'-webkit-fill-available',display:'flex',flexDirection:'row-reverse',alignItems:'center'}}>
        <Content1 />
        <Content2 />
      </div>
        <Content3    />
         {/* <Content4    />
         <Content5    />
         <Content6    />*/}
         <FooterMain      />  
    </div>
  );
};
