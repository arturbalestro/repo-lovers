import locales from "../utils/locales";

const Header = (mainContainer) => {
  const mainTitle = "<h1 class='title'>" + locales.mainTitleText + "</h1>";

  mainContainer.append("<header>" + mainTitle + "</header>");
};

export default Header;
