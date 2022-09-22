import { fetchAllCalls } from "../reducer/index";

let Middleware = (store) => (next) => (action) => {
  if (action.type === "calls/archiveCall/fulfilled") {
    store.dispatch(fetchAllCalls());
  }
  if (action.type === "calls/unArchiveCall/fulfilled") {
    store.dispatch(fetchAllCalls());
  }

  return next(action);
};

export default Middleware;
