import locales from "../utils/locales";

const Header = (mainContainer) => {
  const mainTitle = "<h1 class='title'>" + locales.mainTitleText + "</h1>";

  mainContainer.append(
    '<div class="row">' +
      '<div class="col-md-12">' +
      "<header>" +
      mainTitle +
      "</header>" +
      "</div>" +
      "</div>"
  );
};

export default Header;
