import React from "react";
import { Navbar } from "react-bootstrap";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import ByIngredient from "../ByIngredient";
import Home from "../Home";
import Mealdaylogo from "../images/Mealday-logo.png";
import styles from "./Styles";
import SDE from "../SpoonacularExtraction";

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
      </Navbar>
      <Router>
        <Switch>
          <Route path="/recipe-by-ingredient">
            <ByIngredient />
          </Route>
          <Route path="/utilities/sde">
            <SDE />
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
