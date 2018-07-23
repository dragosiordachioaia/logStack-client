window.addEventListener("error", onError);

function onError(event) {
  console.warn(event);
  console.warn(event.stack);
  let stack;
  if (event.error && event.error.stack) {
    stack = event.error.stack;
  }
  let errorJSON = {
    colno: event.colno,
    lineno: event.lineno,
    message: event.message,
    filename: event.filename,
    timeStamp: event.timeStamp,
    type: event.type,
    stack: stack,
  };

  console.log("to report:");
  console.log(errorJSON);
  // console.log("something");

  axios({
    method: "POST",
    url: "http://localhost:8080/api/issues",
    data: errorJSON,
  });
}
