import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import LoginForm from '../Forms/LogInForm'
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/chat"); 
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div>

      <LoginForm handleSubmit={handleSubmit} err={err} />
    </div>
  );
};

export default LoginPage;