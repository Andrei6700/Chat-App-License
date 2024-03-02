import "./App.css";
import { createBrowserRouter, RouterProvider, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { MainPage } from "./home/main-page";
import { ThemeProvider } from "./context/dark-mode";
import TestPage from './Chat/page-test'
import SignUp from "./Sign Up/pages/SignUp";
import LoginPage from "./Log In/page/LogIn";
import VideoCall from "./Video Call/VideoPage";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

 const router = createBrowserRouter([
    {
      path: "/", 
      element: <Navigate to="/main" />,
    },
    {
      path: "/main",
      element: <MainPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/chat",
      element: <TestPage />,
    },
    {
      path: "/call/:roomID",
      element: <VideoCall  />,
    },
  ]);

  return (
    <ThemeProvider>
      <RouterProvider router={router}>
        <Routes>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/chat" element={<TestPage />} />
          <Route path="/call/create" element={<Navigate to="/call/create" />} />
        </Routes>
      </RouterProvider>
    </ThemeProvider>
  );
}

export default App;