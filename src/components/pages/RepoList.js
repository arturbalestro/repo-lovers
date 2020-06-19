import locales from "../utils/locales";
import axios from "axios";

const loggedInUser =
  sessionStorage.getItem("registroUsuarioGithub") || "octocat";

const getContributors = (loggedInUser, repoName) => {
  //TODO: Add spinner active
  axios
    .get(
      "https://api.github.com/repos/" +
        loggedInUser +
        "/" +
        repoName +
        "/contributors"
    )
    .then((response) => {
      //TODO: Add spinner inactive
      const contributors = response.data.map((contributor) => {
        $("#" + repoName + " ul").append("<li>" + contributor.login + "</li>");
      });
    })
    .catch((error) => {
      //TODO: Add spinner inactive
      //TODO: Fix error message display
      console.log(locales.repoNotFound);
    });
};

const getRepo = (repoListData) => {
  const repo = repoListData
    .map(
      (repo) =>
        '<div class="card">' +
        '<div class="card-header" id="heading-"' +
        repo.name +
        ">" +
        '<h2 class="mb-0">' +
        '<button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#' +
        repo.name +
        '" aria-expanded="false" aria-controls="' +
        repo.name +
        '">' +
        repo.name +
        "</button>" +
        "</h2>" +
        "</div>" +
        '<div id="' +
        repo.name +
        '" class="collapse" aria-labelledby="' +
        repo.name +
        '" data-parent="#repo-list-accordion">' +
        '<div class="card-body">' +
        "<p>Issues: " +
        repo.open_issues +
        "</p>" +
        "<ul class='text-left'>" +
        getContributors(loggedInUser, repo.name) +
        "</ul>" +
        "</div>" +
        "</div>" +
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

  //TODO: Add spinner active
  axios
    .get("https://api.github.com/users/" + loggedInUser + "/repos")
    .then((response) => {
      //TODO: Add spinner inactive
      const repolistContainer = mainContainer.find("#repolist-container");
      repolistContainer.append(renderRepoList(response.data));
    })
    .catch((error) => {
      //TODO: Add spinner inactive
      //TODO: Fix error message display
      console.log(locales.repoNotFound);
    });
};

export default RepoList;
