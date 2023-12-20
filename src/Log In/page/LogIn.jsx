import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import LoginForm from "../Forms/LogInForm";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const { email, password } = data;
  
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/chat");
    } catch (err) {
      setErr(true); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <LoginForm handleSubmit={handleSubmit} loading={loading} err={err} />
    </div>
  );
};

export default LoginPage;
