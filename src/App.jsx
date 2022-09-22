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
import MainReducer from "./store/reducer";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Inbox from "./component/inbox.jsx";

const store = configureStore({
  reducer: {
    main: MainReducer,
  },
  middleware: [thunk],
});

export const history = createBrowserHistory({ window });

const App = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <Header />
        <HistoryRouter history={history}>
          <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to="/inbox">
                  <Nav.Link>Inbox</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/">
                  <Nav.Link>All calls</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Routes>
            <Route path="/inbox" element={<Inbox />} />
            {/* <Route path="product" element={<Product />} />
            <Route path="cart" element={<></>} /> */}
          </Routes>
        </HistoryRouter>
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
