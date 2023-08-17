import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { MainPage } from './Main-page/main-page';
import { SignUpPage } from './SignUp-page/signup-page'
import { LogInPage } from './LogIn-page/login-page';
import TestPage from './test/page-test';
import Register from './test/Register';
import { useContext } from 'react';
import { AuthContext } from './test/context/AuthContext';
import Login from './test/Login';

function App() {
    const { currentUser } = useContext(AuthContext);

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />;
        }

        return children
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={
                            <ProtectedRoute>
                                <MainPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/login" element={<LogInPage />} />
                    <Route path="/test" element={< TestPage />} />
                    <Route path="/register" element={< Register />} />
                    <Route path="/login1" element={< Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;





