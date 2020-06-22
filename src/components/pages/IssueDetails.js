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
const selectedIssue = urlParams.get("selectedIssue");

const renderIssueDetails = (issue) => {
  const issueDetails =
    '<div class="card"><div class="card-body">' +
    "<h5 class='mb-3'>" +
    issue.title +
    "</h5>" +
    "<p class='mb-0'><strong>" +
    locales.issueCreatorTitle +
    "</strong>" +
    issue.user.login +
    "</p><p class='mb-0 mt-1'><strong>" +
    locales.issueDescriptionText +
    "</strong>" +
    issue.body +
    "</p>" +
    '<div class="mt-3" id="comment-container"><h6>' +
    locales.commentsTitle +
    "</h6></div>" +
    "</div>" +
    "</div>";

  return issueDetails;
};

const getIssueDetails = () => {
  const issueListContainer = $("#issue-details-container");
  spinner(true);
  axios
    .get(
      githubAPIURL +
        "/repos/" +
        loggedInUser +
        "/" +
        selectedRepo +
        "/issues/" +
        selectedIssue
    )
    .then((response) => {
      spinner(false);
      issueListContainer.append(
        '<ul class="ml-3 mr-3 mt-3 p-0">' +
          renderIssueDetails(response.data) +
          "</ul>"
      );
      getComments(selectedIssue);
    })
    .catch((error) => {
      spinner(false);
      $("#issueDetailsErrorModal").modal("show");
      issueListContainer.append(
        "<ul><li class='text-center mt-3'>" +
          locales.issueDetailsNotFound +
          "</li></ul>"
      );
    });
};

const renderComments = (comments) => {
  if (comments.length <= 0) {
    return "<li class='text-center mt-3'>" + locales.commentsNotFound + "</li>";
  }

  const commentsList = comments
    .slice(0, 20)
    .map((comment) => {
      if (comment) {
        return (
          "<li class='mb-3 text-left'>" +
          "<div class='card'><div class='card-body'>" +
          "<img src='" +
          comment.user.avatar_url +
          "' alt='" +
          comment.user.login +
          "' />" +
          "<p class='mb-0'><strong>" +
          comment.user.login +
          "</strong></p><p>" +
          comment.body +
          "</p></div></div></li>"
        );
      }
    })
    .join("");

  return commentsList;
};

const getComments = (comments_url) => {
  const commentListContainer = $("#comment-container");
  spinner(true);
  axios
    .get(
      githubAPIURL +
        "/repos/" +
        loggedInUser +
        "/" +
        selectedRepo +
        "/issues/" +
        selectedIssue +
        "/comments"
    )
    .then((response) => {
      spinner(false);
      commentListContainer.append(
        "<ul>" + renderComments(response.data) + "</ul>"
      );
    })
    .catch((error) => {
      spinner(false);
      $("#commentErrorModal").modal("show");
      commentListContainer.append(
        "<ul><li class='text-center mt-3'>" +
          locales.commentsNotFound +
          "</li></ul>"
      );
    });
};

const IssueDetails = () => {
  spinner(true);

  $("#repository-owner").text(loggedInUser);
  $("#repository-name")
    .text(selectedRepo)
    .attr("href", "/repo-details.html?selectedRepo=" + selectedRepo);
  $("#issue-name").text(selectedIssue);

  //Requesting issues
  getIssueDetails();
};

export default IssueDetails;
