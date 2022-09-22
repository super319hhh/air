import { fetchAllCalls } from "../reducer/index";

let Middleware = (store) => (next) => (action) => {
  if (action.type === "calls/getAllCalls/fulfilled") {
    store.dispatch(fetchAllCalls());
  }

  return next(action);
};

export default Middleware;
