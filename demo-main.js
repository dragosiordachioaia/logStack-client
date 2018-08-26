var logStack = window.logStack();
logStack.init({
  // projectID: "5b71e99b9724ed0607d89bb5",
  projectID: "5b7dc08189f8c3006cc31b63",
  context: {
    page: "Main Page",
  },
  user: {
    username: "xdragosy",
  },
});
console.log("client:", logStack);

function getIssueMessage() {
  var inputValue = document.querySelector("#error-message").value;
  return inputValue;
}

document.querySelector("#button-error").addEventListener("click", function(e) {
  throw new Error(getIssueMessage());
});

document.querySelector("#button-manual").addEventListener("click", function(e) {
  logStack.report({
    type: "message",
    message: getIssueMessage(),
  });
});
document
  .querySelector("#button-manual-100")
  .addEventListener("click", function(e) {
    for (let i = 0; i < 100; i++) {
      setTimeout(function() {
        logStack.report({
          type: "message",
          message: getIssueMessage(),
        });
      }, i * 70);
    }
  });

document
  .querySelector("#button-manual-1k")
  .addEventListener("click", function(e) {
    for (let i = 0; i < 1000; i++) {
      setTimeout(function() {
        logStack.report({
          type: "message",
          message: getIssueMessage(),
        });
      }, i * 70);
    }
  });

document
  .querySelector("#button-print-config")
  .addEventListener("click", function(e) {
    logStack.printConfig();
  });

document
  .querySelector("#button-make-dumb-request")
  .addEventListener("click", function(e) {
    axios({
      method: "GET",
      url: `https://www.google.com`,
    });
  });
