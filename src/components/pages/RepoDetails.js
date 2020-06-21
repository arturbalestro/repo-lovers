import locales from "../utils/locales";
import formData from "../utils/formData";
import spinner from "../utils/spinner";
import axios from "axios";

const { input } = formData;
const githubAPIURL = "https://api.github.com";
const loggedInUser =
  sessionStorage.getItem(input.usuarioGithub.id) || "octocat";
const urlParams = new URLSearchParams(window.location.search);
const selectedRepo = urlParams.get("selectedRepo");
const selectedFilter = urlParams.get("filterIssues");

const renderContributors = (contributors) => {
  if (contributors.length <= 0) {
    return (
      "<li class='text-center mt-3'>" + locales.contributorsNotFound + "</li>"
    );
  }

  //TODO Add filters for number of contributions

  const contributorsList = contributors
    .sort((a, b) => b.contributions - a.contributions)
    .slice(0, 20)
    .map((contributor) => {
      if (contributor !== undefined)
        return (
          "<li class='text-center'><div class='card'><div class='card-body'>" +
          "<img src='" +
          contributor.avatar_url +
          "' alt='" +
          contributor.login +
          "' />" +
          "<p class='mb-0'><strong>" +
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
  if (selectedFilter) {
    $("#" + selectedFilter)
      .removeClass("btn-link")
      .addClass("btn-primary");
    issues = filterIssues(issues);
  }

  if (issues.length <= 0) {
    return "<li class='text-center mt-3'>" + locales.issuesNotFound + "</li>";
  }

  //TODO Improve presentation of issues

  const issueList = issues
    .sort((a, b) => b.state - a.state)
    .slice(0, 20)
    .map((issue) => {
      if (issue) {
        return (
          "<li class='" +
          issue.state +
          "'><div class='card'><div class='card-body'><p class='mb-0'><strong>" +
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

const getIssues = (loggedInUser, selectedRepo) => {
  const issueListContainer = $("#issue-container");
  spinner(true);
  axios
    .get(
      githubAPIURL + "/repos/" + loggedInUser + "/" + selectedRepo + "/issues"
    )
    .then((response) => {
      spinner(false);
      issueListContainer.append("<ul>" + renderIssues(response.data) + "</ul>");
    })
    .catch((error) => {
      spinner(false);
      $("#issueErrorModal").modal("show");
      issueListContainer.append(
        "<ul><li class='text-center mt-3'>" +
          locales.issuesNotFound +
          "</li></ul>"
      );
    });
};

const filterIssues = (issues) => {
  if (issues) {
    if (selectedFilter === "filter-open") {
      issues = issues.filter((issue) => issue.state === "open");
    }
    if (selectedFilter === "filter-closed") {
      issues = issues.filter((issue) => issue.state === "closed");
    }
  }

  return issues;
};

const RepoDetails = () => {
  const contributorListContainer = $("#contributor-container");
  spinner(true);

  $("#repository-owner").text(loggedInUser);
  $("#repository-name").text(selectedRepo);

  axios
    .get(
      githubAPIURL +
        "/repos/" +
        loggedInUser +
        "/" +
        selectedRepo +
        "/contributors"
    )
    .then((response) => {
      spinner(false);
      contributorListContainer.append(
        "<ul>" + renderContributors(response.data) + "</ul>"
      );
    })
    .catch((error) => {
      spinner(false);
      $("#contributorErrorModal").modal("show");
      contributorListContainer.append(
        "<ul><li class='text-center mt-3'>" +
          locales.contributorsNotFound +
          "</li></ul>"
      );
    });
  getIssues(loggedInUser, selectedRepo);

  $(".filter-button").click((e) => {
    if (e.target.id === "filter-remove") {
      window.location = "/repo-details.html?selectedRepo=" + selectedRepo;
    } else {
      window.location =
        "/repo-details.html?selectedRepo=" +
        selectedRepo +
        "&filterIssues=" +
        e.target.id;
    }
  });
};

export default RepoDetails;
