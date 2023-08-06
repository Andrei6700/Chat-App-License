import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from './Main-page/main-page';
import { SignUpPage } from './SignUp-page/signup-page'


  function App() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage/>} /> 
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>

      </div>
    );
  }

export default App;
