import locales from "../utils/locales";

const Header = (mainContainer) => {
  const mainTitle =
    "<h1 class='title'><a href='/'>" + locales.mainTitleText + "</a></h1>";
  const subTitle = "<h2 class='subtitle'>" + locales.subTitleText + "</h2>";

  mainContainer.prepend("<header>" + mainTitle + subTitle + "</header>");
};

export default Header;
