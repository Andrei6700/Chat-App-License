import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { MainPage } from "./home/main-page";
import TestPage from "./test/page-test";
import SignUp from "./Sign Up/pages/Register";
import LoginPage from "./Log In/page/LogIn";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };


  return (
    <BrowserRouter>
       <Routes>
  <Route path="/" element={<Navigate to="/main" />} />
  <Route path="/main" element={<MainPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/signup" element={<SignUp />} />
  <Route path="/chat" element={<TestPage />} />
</Routes>
    </BrowserRouter>
);
}

export default App;


