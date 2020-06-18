import locales from "./components/atoms/locales";
import Login from "./components/pages/Login";

const Root = () => {
  //Adding main container to root element
  const rootElement = $("#root");
  rootElement.append(
    "<div class='offset-md-3 col-md-6 text-center' id='main-container'></div>"
  );
  const mainContainer = rootElement.find("#main-container");

  //Rendering title
  mainContainer.append("<h1 class='title'>" + locales.mainTitleText + "</h1>");

  //Renderizando Login como um "componente"
  Login(mainContainer);

  rootElement.append(mainContainer);

  return rootElement;
};

Root();
