var logStack = window.logStack();
logStack.init({
  projectID: "5b71e99b9724ed0607d89bb5",
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
    message: "Stuff",
  });
});
document
  .querySelector("#button-manual-100")
  .addEventListener("click", function(e) {
    for (let i = 0; i < 100; i++) {
      setTimeout(function() {
        logStack.report({
          type: "message",
          message: "Manual message logged",
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
          message: "Manual message logged",
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
