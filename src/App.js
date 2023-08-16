import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from './Main-page/main-page';
import { SignUpPage } from './SignUp-page/signup-page'
import { LogInPage } from './LogIn-page/login-page';
import { TestPage } from './test/page-test'
import Register from './test/Register';
import { useContext } from 'react';
import { AuthContext } from './test/context/AuthContext';



function App() {
    const { currentUser } = useContext(AuthContext)

    console.log(currentUser)

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={< MainPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/login" element={<LogInPage />} />
                    <Route path="/test" element={< TestPage />} />
                    <Route path="/register" element={< Register />} />

                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
