import locales from "../utils/locales";
import logo from "../../img/logo.png";

const Header = (mainContainer) => {
  const logoImg =
    '<img src="' +
    logo +
    '" alt="' +
    locales.mainTitleText +
    '" width="100" />';
  const mainTitle =
    "<h1 class='title'><a href='/'>" +
    logoImg +
    "<span>" +
    locales.mainTitleText +
    "</span>" +
    "</a></h1>";
  const subTitle = "<h2 class='subtitle'>" + locales.subTitleText + "</h2>";

  mainContainer.prepend("<header>" + mainTitle + subTitle + "</header>");
};

export default Header;
