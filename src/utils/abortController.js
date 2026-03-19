let controller = new AbortController();

const refreshAbortController = () => {
  controller.abort();
  controller = new AbortController();
};

const getSignal = () => {
  return controller.signal;
};

export { refreshAbortController, getSignal };
