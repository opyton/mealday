import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Account from "../Account";
import Home from "../Home";
import Mealdaylogo from "../Mealday-logo.png";
import styles from "./Styles";

const Header = () => {
  return (
    <>
      <Navbar>
        <Navbar.Brand href="/">
          <img
            style={styles.customLogo}
            src={Mealdaylogo}
            className="d-inline-block align-top"
            alt="Meal Day Logo"
          />
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/account">
            <span style={styles.headerlinks}>MY ACCOUNT</span>
          </Nav.Link>
        </Nav>
      </Navbar>
      <Router>
        <Switch>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default Header;
