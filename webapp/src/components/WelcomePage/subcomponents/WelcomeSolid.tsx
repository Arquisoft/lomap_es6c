import { Link } from "react-router-dom";

export default function WelcomeSolid() {
  return (
    <div className="welcome_container">
      <Link
        className="welcome_card"
        id="solid-logo"
        to="https://solidproject.org/"
        target="_blank"
      >
        <img
          src="https://solidproject.org/assets/img/solid-emblem.svg"
          alt="Solid logo"
        />
      </Link>
      <p className="welcome_card">
        LoMap utiliza Solid para almacenar los datos de los mapas y de los
        usuarios. Solid es un proyecto de la W3C que permite a los usuarios
        almacenar sus datos en servidores de terceros de forma segura y
        controlar quién puede acceder a ellos. Para más información, haz click
        en su logo.
      </p>
    </div>
  );
}
