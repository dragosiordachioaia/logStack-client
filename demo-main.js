var logStack = window.logStack();
logStack.init({
  projectId: 123,
  context: {
    page: "Main Page",
  },
  user: {
    username: "xdragosy",
  },
});
console.log("client:", logStack);

document.querySelector("#button-error").addEventListener("click", function(e) {
  throw new Error("This is supposed to crash");
});

document.querySelector("#button-manual").addEventListener("click", function(e) {
  logStack.report({
    type: "message",
    message: "This is supposed to get to logStack",
  });
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
