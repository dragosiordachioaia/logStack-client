window.logStack = function() {
  const LOGSTACK_BASE_URL = "http://localhost:5555/api";
  const LOGSTACK_API_VERSION = "v1";
  const LOGSTACK_ENDPOINT = "issues";
  const START_TIME = Date.now();

  let breadcrumbs = [];

  let config = {
    projectID: null,
    context: {},
    user: {},
    tags: {},
  };
  function init(params) {
    config = params;
    window.addEventListener("error", onUncaughtError);
    window.addEventListener("click", onClick);

    // TODO: un-comment this to re-enable http request breadcrumbs
    // xhook.before(function(request) {
    //   let data = {
    //     type: "request",
    //     url: request.url,
    //     method: request.method,
    //   };
    //   addBreadcrumb(data);
    // });
  }

  function printConfig() {
    console.log(config);
  }

  function report(params) {
    makeCall(params);
  }

  function setUser(params) {
    for (let prop in params) {
      config.user[prop] = params[prop];
    }
  }

  function setContext(params) {
    for (let prop in params) {
      config.context[prop] = params[prop];
    }
  }
  function setTags(params) {
    for (let prop in params) {
      config.tags[prop] = params[prop];
    }
  }

  function getNavigatorProps() {
    let navigatorData = {};
    for (let prop in window.navigator) {
      if (
        typeof window.navigator[prop] !== "object" &&
        typeof window.navigator[prop] !== "function"
      ) {
        navigatorData[prop] = window.navigator[prop];
      }
    }
    navigatorData["languages"] = window.navigator.languages;
    return navigatorData;
  }

  function onUncaughtError(event) {
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

    makeCall(errorData);
  }

  function makeCall(params) {
    params.navigator = getNavigatorProps();
    for (let prop in config) {
      params[prop] = config[prop];
    }

    let crtTime = Date.now();

    if (!params.timeStamp) {
      params.timeStamp = crtTime - START_TIME;
    }

    params.breadcrumbs = breadcrumbs;
    // params.navigator = null;

    axios({
      method: "POST",
      url: `${LOGSTACK_BASE_URL}/${LOGSTACK_API_VERSION}/${LOGSTACK_ENDPOINT}/`,
      data: params,
      // headers: {
      //   "Content-Type": "text/plain",
      // },
    });
  }

  function addBreadcrumb(breadcrumbData) {
    breadcrumbs.push(breadcrumbData);
  }

  function onClick(e) {
    let data = {
      type: "click",
      target: {
        tag: event.target.tagName,
        content: event.target.textContent.split(0, 50),
        id: event.target.id,
        classList: event.target.classList,
      },
    };
    addBreadcrumb(data);
  }

  return {
    init: init,
    report: report,
    addBreadcrumb: addBreadcrumb,
    printConfig: printConfig,
    setContext: setContext,
    setUser: setUser,
    setTags: setTags,
  };
};
