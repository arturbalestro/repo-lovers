//TODO import all from ../utils in a single line
import locales from "../utils/locales";
import formData from "../utils/formData";
import spinner from "../utils/spinner";
import axios from "axios";

const { input } = formData;
const githubAPIURL = "https://api.github.com";
const loggedInUser =
  sessionStorage.getItem(input.usuarioGithub.id) || "octocat";

const renderContributors = (contributors) => {
  const contributorsList = contributors.map((contributor) => {
    if (contributor !== undefined) return "<li>" + contributor.login + "</li>";
  });
  return contributorsList;
};

const getContributors = (loggedInUser, repoName) => {
  spinner(true);
  axios
    .get(
      githubAPIURL + "/repos/" + loggedInUser + "/" + repoName + "/contributors"
    )
    .then((response) => {
      spinner(false);
      const contributorListContainer = $("#" + repoName + " ul");
      contributorListContainer.append(renderContributors(response.data));
    })
    .catch((error) => {
      spinner(false);
      //TODO: Fix error message display. Add bootstrap modal.
      console.log(locales.repoNotFound);
    });
};

const getIssues = (loggedInUser, repoName) => {
  spinner(true);
  axios
    .get(githubAPIURL + "/repos/" + loggedInUser + "/" + repoName + "/issues")
    .then((response) => {
      spinner(false);
      //TODO Adapt this to contributors structure
      const issues = response.data.map((issue) => {
        if (issue) {
          $("#" + repoName + " ul").append(
            "<li><p>" +
              issue.title +
              "</p><p>" +
              issue.body +
              "</p><p>" +
              issue.state +
              "</p></li>"
          );
        }
      });
    })
    .catch((error) => {
      spinner(false);
      //TODO: Fix error message display. Add bootstrap modal.
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
        "</button></h2></div>" +
        '<div id="' +
        repo.name +
        '" class="collapse" aria-labelledby="' +
        repo.name +
        '" data-parent="#repo-list-accordion">' +
        '<div class="card-body">' +
        '<div class="card"><div class="card-body">' +
        "<h3>Issues:</h3>" +
        "<ul class='text-left'>" +
        getIssues(loggedInUser, repo.name) +
        "</ul></div></div>" +
        '<div class="card"><div class="card-body">' +
        "<h3>Contribuidores:</h3>" +
        "<ul class='text-left'>" +
        getContributors(loggedInUser, repo.name) +
        "</ul>" +
        "</div></div></div></div></div>"
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
