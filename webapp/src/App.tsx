import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import MainMenu from "./components/MainMenu/MainMenu";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginPage/LoginPage";
import UserLogin from "./components/UserLogin/UserLogin"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route
            path="/start"
            element={
              <div>
                <NavBar />
                <WelcomePage />
                <Footer />
              </div>
            }
          />
          <Route path="/about" element={<div>Sobre Nosotros</div>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/solidprueba" element={<UserLogin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
