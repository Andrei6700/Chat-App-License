import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import { MainPage } from './Main-page/main-page';
import { SignUpPage } from './SignUp-page/signup-page'
import { LogInPage } from './LogIn-page/login-page';
import {TestPage} from './test/page-test'


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes> 
                    <Route path="/" element={<MainPage/>} /> 
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/login" element={<LogInPage />} />
                    <Route path="/test" element={< TestPage/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
