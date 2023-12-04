import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { MainPage } from "./home/main-page";
import { ThemeProvider } from "./context/dark-mode";
import TestPage from './Chat/page-test'
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
    <ThemeProvider>

    <BrowserRouter>
       <Routes>
  <Route path="/" element={<Navigate to="/main" />} />
  <Route path="/main" element={<MainPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/signup" element={<SignUp />} />
  <Route path="/chat" element={<TestPage />} />
</Routes>
    </BrowserRouter>
    </ThemeProvider>

);
}

export default App;


