import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Header from "./Header.jsx";
import { LinkContainer } from "react-router-bootstrap";
import { configureStore } from "@reduxjs/toolkit";
import MainReducer, { closeExtend } from "./store/reducer";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Inbox from "./component/inbox.jsx";
import Archived from "./component/archived.jsx";
import Middleware from "./store/middleware/index";

const store = configureStore({
  reducer: {
    main: MainReducer,
  },
  middleware: [thunk, Middleware],
});

export const history = createBrowserHistory({ window });

const App = () => {
  let [extend, setExtend] = React.useState(null),
    handleCloseExtend = () => {
      setExtend(null);
    };

  return (
    <Provider store={store}>
      <div className="container" onClick={handleCloseExtend}>
        <Header />
        <HistoryRouter history={history}>
          <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to="/">
                  <Nav.Link>Inbox</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/Archived">
                  <Nav.Link>Archived</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Routes>
            <Route
              path="/"
              element={<Inbox extend={extend} setExtend={setExtend} />}
            />
            <Route
              path="/Archived"
              element={<Archived extend={extend} setExtend={setExtend} />}
            />
          </Routes>
        </HistoryRouter>
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
