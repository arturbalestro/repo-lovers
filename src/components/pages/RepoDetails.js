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
const issuesFilter = urlParams.get("issuesFilter");
const contributorsFilter = urlParams.get("contributorsFilter");

const renderContributors = (contributors) => {
  if (contributorsFilter) {
    $("#" + contributorsFilter)
      .removeClass("btn-link")
      .addClass("btn-primary");
    contributors = filterContributors(contributors);
  }

  if (contributors.length <= 0) {
    return (
      "<li class='text-center mt-3'>" + locales.contributorsNotFound + "</li>"
    );
  }

  const contributorsList = contributors
    .sort((a, b) => b.contributions - a.contributions)
    .slice(0, 20)
    .map((contributor) => {
      if (contributor) {
        return (
          "<li class='text-center'>" +
          "<div class='card'><div class='card-body'>" +
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
      }
    })
    .join("");

  return contributorsList;
};

const renderIssues = (issues) => {
  if (issuesFilter) {
    $("#" + issuesFilter)
      .removeClass("btn-link")
      .addClass("btn-primary");
    issues = filterIssues(issues);
  }

  if (issues.length <= 0) {
    return "<li class='text-center mt-3'>" + locales.issuesNotFound + "</li>";
  }

  const issueList = issues
    .sort((a, b) => b.state - a.state)
    .slice(0, 20)
    .map((issue) => {
      if (issue) {
        //TODO Add modal to see the comments
        return (
          '<div class="card">' +
          '<div class="card-header" id="heading-' +
          issue.id +
          '">' +
          '<h2 class="mb-0">' +
          '<button class="btn btn-link btn-block text-left m-0 p-0" type="button" data-toggle="collapse" data-target="#collapse-' +
          issue.id +
          '" aria-expanded="false" aria-controls="collapse-' +
          issue.id +
          '">' +
          issue.title +
          "</button>" +
          "</h2>" +
          "</div>" +
          '<div id="collapse-' +
          issue.id +
          '" class="collapse" aria-labelledby="heading-' +
          issue.id +
          '" data-parent="#issue-accordion">' +
          "<div class='card'><div class='card-body'>" +
          "<p class='mb-0'><strong>" +
          locales.issueCreatorTitle +
          "</strong>" +
          issue.user.login +
          "</p><p class='mb-0 mt-1'><strong>" +
          locales.issueDescriptionText +
          "</strong>" +
          issue.body +
          "</p>" +
          "<p class='mb-0 mt-1'><a href='" +
          issue.comments_url +
          "'>" +
          issue.comments_url +
          "</a></p></div></div>" +
          "</div>" +
          "</div>"
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
      issueListContainer.append(
        '<ul class="accordion" id="issue-accordion">' +
          renderIssues(response.data) +
          "</ul>"
      );
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

const filterContributors = (contributors) => {
  if (contributors) {
    if (contributorsFilter === "filter-100") {
      contributors = contributors.filter(
        (contributor) => contributor.contributions > 100
      );
    }
    if (contributorsFilter === "filter-200") {
      contributors = contributors.filter(
        (contributor) => contributor.contributions > 200
      );
    }
    if (contributorsFilter === "filter-500") {
      contributors = contributors.filter(
        (contributor) => contributor.contributions > 500
      );
    }
  }

  return contributors;
};

const filterIssues = (issues) => {
  if (issues) {
    if (issuesFilter === "filter-open") {
      issues = issues.filter((issue) => issue.state === "open");
    }
    if (issuesFilter === "filter-closed") {
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

  //Requesting contributors
  //Running this outside a function due to issues of not loading response
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

  //Requesting issues
  getIssues(loggedInUser, selectedRepo);

  //Applying the filters
  $(".filter-button").click((e) => {
    if ($(e.target).hasClass("filter-remove")) {
      window.location = "/repo-details.html?selectedRepo=" + selectedRepo;
    } else if ($(e.target).hasClass("filter-contributors")) {
      window.location =
        "/repo-details.html?selectedRepo=" +
        selectedRepo +
        "&contributorsFilter=" +
        e.target.id;
    } else {
      window.location =
        "/repo-details.html?selectedRepo=" +
        selectedRepo +
        "&issuesFilter=" +
        e.target.id;
    }
  });
};

export default RepoDetails;
