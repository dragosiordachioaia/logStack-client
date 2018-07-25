window.logStack = (function() {
  window.addEventListener("error", onUncaughtError);

  function report(params) {

  }

  function getNavigatorProps() {
    let navigatorData = {};
    for (let prop in window.navigator) {
      if(
        typeof (window.navigator[prop]) !== "object" &&
        typeof (window.navigator[prop]) !== "function"
      ) {
        navigatorData[prop] = window.navigator[prop];
      }
    }
    navigatorData["languages"] = window.navigator.languages;
    return navigatorData;
  }

  function onUncaughtError(event) {
    console.warn(event);
    console.warn(event.stack);
    let stack;

    if (event.error && event.error.stack) {
      stack = event.error.stack;
    }
    let errorData = {
      colno: event.colno,
      lineno: event.lineno,
      message: event.message,
      filename: event.filename,
      timeStamp: event.timeStamp,
      type: "error",
      stack: stack,
    };

    console.log("to report:");
    console.log(errorJSON);

    makeCall(errorData);
  }

  function makeCall(data) {
    const LOGSTACK_BASE_URL = "http://localhost:8080/api";
    const LOGSTACK_API_VERSION = "v1";
    const LOGSTACK_ENDPOINT = "issues"

    data.navigator = getNavigatorProps();

    axios({
      method: "POST",
      url: `${LOGSTACK_BASE_URL}/${LOGSTACK_API_VERSION}/${LOGSTACK_ENDPOINT}/`,
      data: data,
    });
  }

  return {
    report: report,
  }
})();
