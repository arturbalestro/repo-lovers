import Header from "./components/atoms/Header";
import Login from "./components/pages/Login";
import RepoList from "./components/pages/RepoList";
import RepoDetails from "./components/pages/RepoDetails";
import IssueDetails from "./components/pages/IssueDetails";

//Importing styles
import "./styles/index.css";
import "js-datepicker/dist/datepicker.min.css";
import locales from "./components/utils/locales";

const Root = () => {
  //Adding main container to root element
  const rootElement = $("#root");
  rootElement.append(
    "<div class='row'><div class='col-md-12 text-center m-0 p-0' id='main-container'></div></div>"
  );
  const mainContainer = rootElement.find("#main-container");

  //Rendering page components
  Header(rootElement);
  switch (window.location.pathname) {
    case "/login.html":
      Login(mainContainer);
      break;

    case "/repo-list.html":
      RepoList(mainContainer);
      break;

    case "/repo-details.html":
      RepoDetails(mainContainer);
      break;

    case "/issue-details.html":
      IssueDetails(mainContainer);
      break;

    default:
      Login(mainContainer);
      break;
  }

  //Rendering spinner
  rootElement.append(
    '<div class="spinner justify-content-center hidden">' +
      '<div class="spinner-border" role="status">' +
      '<span class="sr-only">'+locales.loadingText+'</span>' +
      "</div>" +
      "</div>"
  );

  rootElement.append(mainContainer);

  return rootElement;
};

Root();
