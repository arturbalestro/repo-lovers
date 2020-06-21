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
        '">' +
        locales.repoDetailsButtonText +
        "</a>" +
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
    window.location = "/repo-details.html?selectedRepo=" + e.target.id;
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

  const repolistContainer = mainContainer.find("#repolist-container");
  spinner(true);
  axios
    .get(githubAPIURL + "/users/" + loggedInUser + "/repos")
    .then((response) => {
      spinner(false);
      repolistContainer.append(renderRepoList(response.data));
    })
    .catch((error) => {
      spinner(false);
      $("#repoErrorModal").modal("show");
      repolistContainer.append(
        '<div class="text-center">' + locales.repoNotFound + "</div>"
      );
    });
};

export default RepoList;
