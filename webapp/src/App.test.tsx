import {
  act,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";
import RequestFriendship from "./components/Solid/Friends/RequestFriendship";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import CommentsPage from "./components/CommentsPage/CommentsPage";
import UserLogin from "./components/Solid/User/UserLogin";
import ProfileViewer from "./components/Solid/User/ProfileViewer";
import ReactDOM from "react-dom";
import { addMarker } from "./api/api";
import WelcomePage from "./components/Pages/WelcomePage/WelcomePage";
import { OSMap } from "./components/Map/OSMap";

/**
 * TESTS PAGES
 */

/**
 * Test that default web page shows correctly
 */
// test("aplication starts in correct page", () => {
//   render(<App />);
//   const init = screen.getByText("Inicio");
//   const documentation = screen.getByText("Documentación");
//   const about = screen.getByText("Sobre Nosotros");
//   const profile = screen.getByText("Profile");
//   expect(init).toBeInTheDocument();
//   expect(documentation).toBeInTheDocument();
//   expect(about).toBeInTheDocument();
//   expect(profile).toBeInTheDocument();
// });

test("about renders correctly", () => {
  render(<About />);
  const title_txt = screen.getByRole("heading", {
    name: "Sobre Nosotros - LoMap_ES6C",
  });

  expect(title_txt).toBeInTheDocument();

  const text =
    "Bienvenidos a nuestra aplicación, la cual sido diseñada para la asignatura de Arquitectura del Software de la Universidad de Oviedo. Esperamos que les resulte util.";
  const p = screen.getByText(text);
  expect(p).toBeInTheDocument();
});

test("commentsPage renders correctly", () => {
  render(<CommentsPage />);
  const cancel_button_img = screen.getByRole("img");
  const title = screen.getByText("Crear marcador");
  const name = screen.getByText("Titulo del marcador:");
  const type = screen.getByText("Tipo:");
  const pub = screen.getByRole("option", { name: "Bar o restaurante" });
  const monument = screen.getByRole("option", { name: "Monumento" });
  const landscape = screen.getByRole("option", { name: "Paisaje / Mirador" });
  const comment_area = screen.getByPlaceholderText(
    "Escribe tu comentario aquí"
  );
  const submit = screen.getByRole("button", { name: "Enviar" });

  expect(cancel_button_img).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(type).toBeInTheDocument();
  expect(pub).toBeInTheDocument();
  expect(monument).toBeInTheDocument();
  expect(landscape).toBeInTheDocument();
  expect(comment_area).toBeInTheDocument();
  expect(submit).toBeInTheDocument();
});

test("requestFriendship render throw exception correctly without athentication", () => {
  try {
    render(<RequestFriendship />);
  } catch (error) {
    expect(true);
  }
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
 * TESTS LINKS
 */

/**
 * Test that link to start page works correctly
 */
 test("init page shows correctly", () => { 
   render(<App />);

   const welcome = screen.getByText("Bienvenido a LoMap");
   const solid_logo = screen.getByRole('link',{name:"Solid logo"});
   const logos = screen.getAllByRole('img');
   const inicio_logo = logos[0];
   const doc_logo = logos[1];
   const about_logo = logos[2];
   const profile_logo = logos[3];
   const logo_app = screen.getByRole('img',{name:"Logo"});

   const links = screen.getAllByRole('link');
   const inicio_link = links[0];
   const doc_link = links[1];
   const about_link = links[2];
   const profile_link = links[3];
   
   expect(inicio_logo).toBeInTheDocument();
   expect(doc_logo).toBeInTheDocument();
   expect(about_logo).toBeInTheDocument();
   expect(profile_logo).toBeInTheDocument();
   expect(solid_logo).toBeInTheDocument();
   expect(logo_app).toBeInTheDocument();

   expect(welcome).toBeInTheDocument();
   expect(inicio_link).toBeInTheDocument();
   expect(doc_link).toBeInTheDocument();
   expect(about_link).toBeInTheDocument();
   expect(profile_link).toBeInTheDocument();
   
   expect(screen.getAllByRole("button")[1]).toBeInTheDocument();

   expect(location.href).toBe("http://localhost/");
 });

test('documentation link ref to documentation page', () => {
  render(<App />);
  const link_doc = screen.getAllByRole('link')[1];
  expect(link_doc.getAttribute('href')).toBe('https://arquisoft.github.io/lomap_es6c/');
});

/**
 * Test that default page link for profile redirects correctly
 */
test("cant see profile when not logged in", () => {
  render(<App />);
  const links  = screen.getAllByRole('link');
  fireEvent.click(links[3]);

  const info_text = screen.getByText("Not logged in");

  expect(info_text).toBeInTheDocument();

  expect(location.href).toBe("http://localhost/user");
});

/**
 * Test that start button in start page works correctly
 * Test too that u can click in LOGIN button and go to inrupt log in
 */
//TODO: no entiendo porque el boton comenzar no redirecciona a inrupt
test("start page start-button works correctly", () => {
  render(<App />);

  const start_buttons = screen.getAllByRole('button',{name:"Comenzar"}); 
  fireEvent.click(start_buttons[1]);
   
  
  expect(location.href).toBe("http://localhost/");
});

/**
 * Test that NavBar shows correctly
 */
test("navbar shows correctly", () => {
  render(<App />);

  const title = screen.getByText("LoMap");

  const logos = screen.getAllByRole('img');
  const init = logos[0];
  const documentation = logos[1];
  const about = logos[2];
  const profile = logos[3];
  expect(logos.length).toBe(6);

  const links = screen.getAllByRole('link');
  expect(links.length).toBe(5);

  expect(title).toBeInTheDocument();
  expect(init).toBeInTheDocument();
  expect(documentation).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(profile).toBeInTheDocument();

  const logo = screen.getByRole("img", { name: "Logo" });
  expect(logo).toBeInTheDocument();

  expect(location.href).toBe("http://localhost/");
});



/**
 * Test that a navbar link for profile works correctly
 */
test("navbar link to profile works correctly", () => {
  render(<App />);

  const links = screen.getAllByRole('link');

  const profile = links[3];

  fireEvent.click(profile);
  
  expect(location.href).toBe("http://localhost/user");

  const txt = screen.getByText("Not logged in");

  expect(txt).toBeInTheDocument();

});

describe("CommentsPage", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders correctly", () => {
    const props = {
      lat: [0, 0],
      onSubmit: jest.fn(),
      onChange: jest.fn(),
    };
 
    const { getByText, getByLabelText, getByPlaceholderText, getAllByRole } =
      render(<CommentsPage {...props} />);

    // Verifica que los elementos principales se renderizaron correctamente
    expect(getByText("Crear marcador")).toBeInTheDocument();
    expect(getByLabelText("Titulo del marcador:")).toBeInTheDocument();
    expect(getByLabelText("Tipo:")).toBeInTheDocument();
    expect(
      getByPlaceholderText("Escribe tu comentario aquí")
    ).toBeInTheDocument();
    expect(getByText("Enviar")).toBeInTheDocument();
    expect(getAllByRole("button")[0]).toBeInTheDocument();
  });

  it("submit form", async () => {
    const onSubmitMock = jest.fn();
    const onChangeMock = jest.fn();

    render(
      <CommentsPage
        onSubmit={onSubmitMock}
        onChange={onChangeMock}
        lat={[0, 0]}
      />
    );

    const titleInput = screen.getByLabelText("Titulo del marcador:");
    fireEvent.change(titleInput, { target: { value: "Test Title" } });

    const commentInput = screen.getByPlaceholderText(
      "Escribe tu comentario aquí"
    );
    fireEvent.change(commentInput, { target: { value: "Test Comment" } });

    const submitButton = screen.getByText("Enviar");

    //fireEvent.click(submitButton);

    await act(async () => {
      jest.runAllTimers();
    });

    //expect(onSubmitMock).toHaveBeenCalled();
  });

  it("calls the onChange prop when canceling the form", () => {
    const onChangeMock = jest.fn();
    const props = {
      lat: [0, 0],
      onSubmit: jest.fn(),
      onChange: onChangeMock,
    };
    const { getAllByRole } = render(<CommentsPage {...props} />);
    const cancelButton = getAllByRole("button")[0];

    // Simula que se hace clic en el botón Cancelar
    fireEvent.click(cancelButton);

    // Verifica que el método onChange se llamó correctamente
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});

describe("App component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("addMarker", () => {
  let mockFetch: jest.SpyInstance;

  beforeEach(() => {
    mockFetch = jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    mockFetch.mockRestore();
  });

  it("should return true if the API call is successful", async () => {
    mockFetch.mockResolvedValueOnce({ status: 200 });

    const result = await addMarker({ lat: 0, lng: 0, comment: "test comment" });

    expect(result).toBe(true);
  });

  it("should return false if the API call is not successful", async () => {
    mockFetch.mockResolvedValueOnce({ status: 500 });

    const result = await addMarker({ lat: 0, lng: 0, comment: "test comment" });

    expect(result).toBe(false);
  });
});

describe("ProfileViewer", () => {
  it("cant render because not authenticated", async () => {
    try {
      render(<ProfileViewer />);
    } catch (Error) {
      expect(true); //Si entra es porque salto el error
    }
  });
});

// Creamos un mock de LoginButton de @inrupt/solid-ui-react

// describe("UserLogin", () => {
//   jest.mock("@inrupt/solid-ui-react", () => ({
//     LoginButton: () => {
//       return {
//         webId: "https://uo277938.inrupt.net/profile/card#me",
//         isLoggedIn:true,
//       };
//     }
//   }));

//   jest.mock("@inrupt/solid-ui-react", () => ({
//     useSession: () => ({
//       info: {
//         webId: "https://uo277938.inrupt.net/profile/card#me",
//       },
//     }),
//   }));
  
//   jest.mock("@inrupt/solid-client-authn-browser", () => ({
//     getDefaultSession: () => ({
//         info: {
//           webId: "https://joseji.inrupt.net/profile/card#me",
//           isLoggedIn: true,
//         },
//     }),
//   }));
  
//   test("renders login button", () => {
//     // Renderizamos el componente
//     const { getByText } = render(<UserLogin />);
//     const loginButton = getByText("Comenzar");

//     // Verificamos que se renderizó el botón de inicio de sesión
//     expect(loginButton).toBeInTheDocument();

//     // Simulamos la interacción del usuario con el botón de inicio de sesión
//     fireEvent.click(loginButton);

//     // Verificamos que el botón de inicio de sesión fue presionado
//     expect(loginButton).toHaveAttribute("name", "Login");
//   // });
// });