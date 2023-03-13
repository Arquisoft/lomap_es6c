import "./MainMenu.css";
import { Link } from "react-router-dom";

export default function MainMenu() {
  return (
    <div>
      (
      <div id="menu">
        <div id="menu-items">
          <Link to="/start" className="menu-item">
            Inicio
          </Link>
          <Link
            to="https://arquisoft.github.io/lomap_es6c/"
            target="_blank"
            className="menu-item"
          >
            Documentación
          </Link>
          <Link to="/about" className="menu-item">
            Sobre Nosotros
          </Link>
          <Link to="/login" className="menu-item">
            Log in
          </Link>
        </div>
        <div id="menu-background-pattern"></div>
        <div id="menu-background-image"></div>
      </div>
      )
    </div>
  );
}
