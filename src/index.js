import locales from "./components/utils/locales";
import Header from "./components/atoms/Header";
import Login from "./components/pages/Login";
//import "./styles/index.css";

const Root = () => {
  //Adding main container to root element
  const rootElement = $("#root");
  rootElement.append(
    "<div class='col-md-12 text-center' id='main-container'></div>"
  );
  const mainContainer = rootElement.find("#main-container");

  //Rendering title
  Header(mainContainer);

  //Renderizando Login como um "componente"
  Login(mainContainer);

  rootElement.append(mainContainer);

  return rootElement;
};

Root();
