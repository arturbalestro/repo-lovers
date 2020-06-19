import locales from "../utils/locales";
import axios from "axios";

const getRepoListData = (loggedInUser) => {};

const getRepo = (repoListData) => {
  const repo = repoListData
    .map((repo) => '<li class="list-group-item">' + repo.name + "</li>")
    .join("");

  return repo;
};

const renderRepoList = (repoListData) => {
  let repoList = null;

  if (repoListData.length > 0) {
    repoList = '<ul class="list-group">' + getRepo(repoListData) + "</ul>";
  } else {
    repoList = "<p>" + locales.repoNotFound + "</p>";
  }

  return repoList;
};

const RepoList = (mainContainer) => {
  //TODO Adicionar o usuário criado no login
  const loggedInUser = "arturbalestro";
  //TODO: Add spinner active
  axios
    .get("https://api.github.com/users/" + loggedInUser + "/repos")
    .then((response) => {
      //TODO: Add spinner inactive
      mainContainer.append(
        '<div id="page-repolist" class="offset-md-3 col-md-6 text-center">' +
          "<div><h2>" +
          locales.repoListTitle +
          "</h2>" +
          '<div id="repolist-container">' +
          renderRepoList(response.data) +
          "</div>" +
          "</div>" +
          "</div>"
      );
    })
    .catch((error) => {
      //TODO: Add spinner inactive
      //TODO: Fix error message display
      alert(locales.repoNotFound);
    });
};

export default RepoList;
