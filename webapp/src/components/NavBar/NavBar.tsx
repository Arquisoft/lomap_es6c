import "./NavBar.css";
import lomap_icon from "../../images/lomap-icon.png";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <div className="header_left">
        <img src={lomap_icon} alt="Logo"></img>
        <h2 className="site_title">LoMap</h2>
      </div>
      <div>
        <ul className="list">
          <li className="list_item, active">
            <Link to="/start">Inicio</Link>
          </li>
          <li className="list_item">
            <Link to="https://arquisoft.github.io/lomap_es6c/" target="_blank">
              Documentación
            </Link>
          </li>
          <li className="list_item">
            <Link to="/about">Sobre Nosotros</Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className="list">
          <li className="list_item">
            <Link to="/signup">Sign Up</Link>
          </li>
          <li className="list_item">
            <Link to="/login">Log In</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
