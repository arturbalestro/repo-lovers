import locales from "../utils/locales";
import formData from "../utils/formData";
import spinner from "../utils/spinner";
import axios from "axios";

const { input } = formData;
const githubAPIURL = "https://api.github.com";
const loggedInUser =
  sessionStorage.getItem(input.usuarioGithub.id) || "octocat";

const getRepo = (repoListData) => {
  const repo = repoListData
    .map(
      (repo) =>
        '<div class="repo-list-wrapper"><div class="card">' +
        '<div class="card-header" id="heading-"' +
        repo.name +
        ">" +
        "<h4>" +
        repo.name +
        "</h4>" +
        '<a class="btn btn-primary text-left m-1 details-button" type="button" href="/repo-details.html?selectedRepo=' +
        repo.name +
        '">View details</a>' +
        "</div></div>" +
        "</div>"
    )
    .join("");

  return repo;
};

const renderRepoList = (repoListData) => {
  let repoList = null;

  if (repoListData.length > 0) {
    repoList =
      '<div class="accordion" id="repo-list-accordion">' +
      getRepo(repoListData) +
      "</div>";
  } else {
    repoList = "<p>" + locales.repoNotFound + "</p>";
  }

  $(".details-button").click((e) => {
    sessionStorage.setItem("selected-repo", e.target.id);
    window.location = "/repo-details.html";
  });

  return repoList;
};

const RepoList = (mainContainer) => {
  mainContainer.append(
    '<div id="page-repolist" class="offset-md-3 col-md-6 text-center">' +
      "<div><h2>" +
      locales.repoListTitle +
      " de " +
      loggedInUser +
      "</h2>" +
      '<div id="repolist-container"></div>' +
      "</div>" +
      "</div>"
  );

  spinner(true);
  axios
    .get(githubAPIURL + "/users/" + loggedInUser + "/repos")
    .then((response) => {
      spinner(false);
      const repolistContainer = mainContainer.find("#repolist-container");
      repolistContainer.append(renderRepoList(response.data));
    })
    .catch((error) => {
      spinner(false);
      //TODO: Fix error message display. Add bootstrap modal.
      console.log(locales.repoNotFound);
    });
};

export default RepoList;
