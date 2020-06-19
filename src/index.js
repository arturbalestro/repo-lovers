import Header from "./components/atoms/Header";
import Login from "./components/pages/Login";
import "./styles/index.css";
import RepoList from "./components/pages/RepoList";

const Root = () => {
  //Adding main container to root element
  const rootElement = $("#root");
  rootElement.append(
    "<div class='row'><div class='col-md-12 text-center m-0 p-0' id='main-container'></div></div>"
  );
  const mainContainer = rootElement.find("#main-container");

  //Renderizando componentes da página
  Header(mainContainer);
  switch (window.location.pathname) {
    case "/login.html":
      Login(mainContainer);
      break;

    case "/repo-list.html":
      RepoList(mainContainer);
      break;

    default:
      Login(mainContainer);
      break;
  }

  rootElement.append(mainContainer);

  return rootElement;
};

Root();
