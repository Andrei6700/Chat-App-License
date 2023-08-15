import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import { MainPage } from './Main-page/main-page';
import { SignUpPage } from './SignUp-page/signup-page'
import { LogInPage } from './LogIn-page/login-page';
import {TestPage} from './test/page-test'
import Register from './test/Register';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes> 
                    <Route path="/">
                        <Route index element={<MainPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/login" element={<LogInPage />} />
                        <Route path="/test" element={< TestPage/>} /> 
                        <Route path="/register" element={< Register/>} /> 
                    </Route>
                    
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
