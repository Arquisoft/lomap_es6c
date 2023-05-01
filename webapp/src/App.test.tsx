import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";
import RequestFriendship from "./components/Solid/Friends/RequestFriendship";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import CommentsPage from "./components/CommentsPage/CommentsPage";
import LoginForm from "./components/Pages/LoginPage/LoginPage";
import UserLogin from "./components/Solid/User/UserLogin";

/**
 * TESTS PAGES
 */

/**
 * Test that default web page shows correctly
 */
test("aplication starts in correct page", () => {
  render(<App />);
  const init = screen.getByText("Inicio");
  const documentation = screen.getByText("Documentación");
  const about = screen.getByText("Sobre Nosotros");
  const profile = screen.getByText("Profile");
  expect(init).toBeInTheDocument();
  expect(documentation).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(profile).toBeInTheDocument();
});

test("about renders correctly", () => {
  render(<About />);
  const title_txt = screen.getByRole("heading", {
    name: "Sobre Nosotros - LoMap_ES6C",
  });

  expect(title_txt).toBeInTheDocument();
});

test("commentsPage renders correctly", () => {
  render(<CommentsPage />);
  const cancel_button_img = screen.getByRole("img");
  const title = screen.getByText("Crear marcador");
  const name = screen.getByText("Titulo del marcador:");
  const type = screen.getByText("Tipo de marcador");
  const pub = screen.getByRole("option", { name: "Bar o restaurante" });
  const monument = screen.getByRole("option", { name: "Monumento" });
  const landscape = screen.getByRole("option", { name: "Paisaje / Mirador" });
  const comment_area = screen.getByPlaceholderText(
    "Escribe tu comentario aquí"
  );
  const rating = screen.getByText("Puntuación:");
  const submit = screen.getByRole("button", { name: "Enviar" });

  expect(cancel_button_img).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(type).toBeInTheDocument();
  expect(pub).toBeInTheDocument();
  expect(monument).toBeInTheDocument();
  expect(landscape).toBeInTheDocument();
  expect(comment_area).toBeInTheDocument();
  expect(rating).toBeInTheDocument();
  expect(submit).toBeInTheDocument();
});

test("loginForm renders correctly", () => {
  render(<LoginForm />);
  const img = screen.getByRole("img", { name: "Logo" });
  const title = screen.getByRole("heading", { name: "Log in" });
  const buttons = screen.getAllByRole("button", { name: "Login" });

  expect(img).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(buttons[1]).toBeInTheDocument();
});

test("userLogin renders correctly", () => {
  render(<UserLogin />);
  const txtbox = screen.getByRole("textbox", { name: "" });
  const btn_login = screen.getAllByRole("button", { name: "Login" })[1];

  expect(txtbox).toBeInTheDocument();
  expect(btn_login).toBeInTheDocument();
});

test("requestFriendship renders correctly without athentication", () => {
  render(<RequestFriendship />);
  const friend_text = screen.getByText("Vete al login que no tas autenticado");

  expect(friend_text).toBeInTheDocument();
});

test("footer render property", () => {
  render(<Footer />);
  const txt = screen.getByText("© Lomap 2023");
  expect(txt).toBeInTheDocument();
});

/**
 * TESTS LINKS
 */

/**
 * Test that link to start page works correctly
 */
test("init page shows correctly", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("link", { name: "Inicio" }));
  const welcome = screen.getByText("Bienvenido a LoMap");
  expect(welcome).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Comenzar" })).toBeInTheDocument();
});

/**
 * Test that default page link for about option redirects correctly
 */
test("about option works correctly", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("link", { name: "Sobre Nosotros" }));

  const title = screen.getByText("Sobre Nosotros - LoMap_ES6C");
  expect(title).toBeInTheDocument();
});

/**
 * Test that default page link for profile redirects correctly
 */
test("profile link redirects correctly", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("link", { name: "Profile" }));

  const image = screen.getByRole("img", { name: "Logo" });
  const title = screen.getByText("Log in");
  const button = screen.getByText("Login");

  expect(image).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

/**
 * Test that start button in start page works correctly
 * Test too that u can click in LOGIN button and go to inrupt log in
 */
test("start page start-button works correctly", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("link", { name: "Inicio" }));

  const start_button = screen.getByRole("link", { name: "Comenzar" });
  fireEvent.click(start_button);

  const login = screen.getByText("Log in");
  expect(login).toBeInTheDocument();

  const login_button = screen.getByText("Login");
  fireEvent.click(login_button);
});

/**
 * Test that NavBar shows correctly
 */
test("navbar shows correctly", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("link", { name: "Inicio" }));

  const title = screen.getByText("LoMap");
  const init = screen.getByRole("link", { name: "Inicio" });
  const documentation = screen.getByRole("link", { name: "Documentación" });
  const about = screen.getByRole("link", { name: "Sobre Nosotros" });
  const profile = screen.getByRole("link", { name: "Profile" });

  expect(title).toBeInTheDocument();
  expect(init).toBeInTheDocument();
  expect(documentation).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(profile).toBeInTheDocument();

  const logo = screen.getByRole("img", { name: "Logo" });
  expect(logo).toBeInTheDocument();
});

/**
 * Test that a navbar link for about works correctly
 */
test("navbar link to about works correctly", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("link", { name: "Inicio" }));

  const about = screen.getByRole("link", { name: "Sobre Nosotros" });
  fireEvent.click(about);

  const heading = screen.getByRole("heading", {
    name: "Sobre Nosotros - LoMap_ES6C",
  });
  expect(heading).toBeInTheDocument();
});

/**
 * Test that a navbar link for profile works correctly
 */
test("navbar link to profile works correctly", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("link", { name: "Inicio" }));

  const profile = screen.getByRole("link", { name: "Profile" });
  fireEvent.click(profile);

  const image = screen.getByRole("img", { name: "Logo" });
  const title = screen.getByRole("heading", { name: "Log in" });
  const button = screen.getByText("Login");
  const id_prov = screen.getByPlaceholderText("Identity Provider");

  expect(image).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(button).toBeInTheDocument();
  expect(id_prov).toBeInTheDocument();
});
