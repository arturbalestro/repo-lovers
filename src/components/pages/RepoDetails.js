import locales from "../utils/locales";
import formData from "../utils/formData";
import spinner from "../utils/spinner";
import axios from "axios";

const { input } = formData;
const githubAPIURL = "https://api.github.com";
const loggedInUser =
  sessionStorage.getItem(input.usuarioGithub.id) || "octocat";
const repoName = window.location.search.split("=")[1];

const renderContributors = (contributors) => {
  const contributorsList = contributors
    .sort((a, b) => b.contributions - a.contributions)
    .map((contributor) => {
      if (contributor !== undefined)
        return (
          "<li><div class='card'><div class='card-body'><p class='mb-0'><strong>" +
          contributor.login +
          "</strong></p> <p>Contributions: " +
          contributor.contributions +
          "</p></div></div></li>"
        );
    })
    .join("");
  return contributorsList;
};

const renderIssues = (issues) => {
  const issueList = issues
    .sort((a, b) => b.state - a.state)
    .map((issue) => {
      if (issue) {
        return (
          "<li><div class='card'><div class='card-body'><p class='mb-0'><strong>" +
          issue.title +
          "</strong></p><p class='mb-0'>" +
          issue.user.login +
          "</p><p class='mb-0'>" +
          issue.body +
          "</p></div></div></li>"
        );
      }
    })
    .join("");

  return issueList;
};

const getIssues = (loggedInUser, repoName) => {
  spinner(true);
  axios
    .get(githubAPIURL + "/repos/" + loggedInUser + "/" + repoName + "/issues")
    .then((response) => {
      spinner(false);
      const issueListContainer = $("#issue-container");
      issueListContainer.append("<ul>" + renderIssues(response.data) + "</ul>");
    })
    .catch((error) => {
      spinner(false);
      //TODO: Fix error message display. Add bootstrap modal.
      console.log(locales.repoNotFound);
    });
};

const filterOpenIssues = (issues) => {
  issues = issues.filter((issue) => issue.state === "open");

  const issueListContainer = $("#issue-container");
  issueListContainer.append("<ul>" + renderIssues(issues) + "</ul>");
};

const filterClosedIssues = (issues) => {
  issues = issues.filter((issue) => issue.state === "closed");

  const issueListContainer = $("#issue-container");
  issueListContainer.append("<ul>" + renderIssues(issues) + "</ul>");
};

const RepoDetails = (mainContainer) => {
  spinner(true);

  $("#repository-owner").text(loggedInUser);
  $("#repository-name").text(repoName);

  axios
    .get(
      githubAPIURL + "/repos/" + loggedInUser + "/" + repoName + "/contributors"
    )
    .then((response) => {
      spinner(false);
      const contributorListContainer = $("#contributor-container");
      contributorListContainer.append(
        "<ul>" + renderContributors(response.data) + "</ul>"
      );
      getIssues(loggedInUser, repoName);
    })
    .catch((error) => {
      spinner(false);
      //TODO: Fix error message display. Add bootstrap modal.
      console.log(locales.repoNotFound);
    });

  $("#filter-open").click(() => {
    //TODO Finish this logic
    //filterOpenIssues($("#issue-container li"));
  });
};

export default RepoDetails;
