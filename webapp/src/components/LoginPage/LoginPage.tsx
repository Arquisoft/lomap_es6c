import React, { useState } from "react";
import "./LoginPage.css";
import lomap_icon from "../../images/lomap-icon.png";
import { Link } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("{username: " + username + ", password: " + password + "}");
  };

  return (
    <div className="main_form">
      <div className="login">
        <img src={lomap_icon} alt="Logo"></img>
        <h1>Log in</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form_field">
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="username"
            />
          </div>
          <div className="form_field">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="••••••••"
            />
          </div>
          <div className="form_field">
            <button type="submit">Enviar</button>
          </div>
        </form>
        <p>
          ¿No tienes una cuenta? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
