import React from "react";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { AiOutlineMail, AiOutlineInstagram, AiOutlineLinkedin} from "react-icons/ai";
import "./Footer.css"
import Logo from "../../../img/logo2-removebg-preview.png"
const FooterMain =()=>{
  const redirectTo = (url) => {
    window.location.href = url;
  };

  return (
    <div className="Footer-Container"  style={{width:'-webkit-fill-available',color:'black'}}>
      <footer className="Footer-Items">
        <aside className="Footer-Left">
          <h3 className="h3_Footer">ChatApp</h3>
          <img className="Logo_Footer" src={Logo}/>
        </aside> 
        <nav className="Footer-Social">
          <div onClick={() => redirectTo("https://github.com/Andrei6700")}>
            <BsGithub size={30} />
          </div>
          <div onClick={() => redirectTo("https://www.linkedin.com/in/andreibalanoiu/")}>
            <AiOutlineLinkedin size={30} />
          </div>
          <div onClick={() => redirectTo("mailto:andreibalanoiu67@gmail.com")}>
            <AiOutlineMail size={30} />
          </div>
          <div onClick={() => redirectTo("https://twitter.com/")}>
            <BsTwitter size={30} />
          </div>
          <div onClick={() => redirectTo("https://instagram.com/")}>
            <AiOutlineInstagram size={30} />
          </div>
        </nav>
      </footer>
      <p className="p_FooterMain">Copyright © 2024 - All right reserved</p>

    </div>
  );
}

export default FooterMain;
