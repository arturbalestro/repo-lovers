import locales from "../utils/locales";

const Header = (mainContainer) => {
  const mainTitle = "<h1 class='title'><a href='/'>" + locales.mainTitleText + "</a></h1>";
  const subTitle = "<h2 class='title'>" + locales.subTitleText + "</h2>"

  mainContainer.append("<header>" + mainTitle + "</header>");
};

export default Header;
