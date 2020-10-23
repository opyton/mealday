import React from "react";
import { Navbar } from "react-bootstrap";
//import Nav for my account
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Account from "../Account";
import ByIngredient from "../ByIngredient";
import ByNutrient from "../ByNutrient";
import RandomRecipe from "../RandomRecipe";
import Home from "../Home";
import Mealdaylogo from "../images/Mealday-logo.png";
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
        {/* <Nav className="ml-auto">
          <Nav.Link href="/account">
            <span style={styles.headerlinks}>MY ACCOUNT</span>
          </Nav.Link>
        </Nav> */}
      </Navbar>
      <Router>
        <Switch>
          {/* <Route path="/account">
            <Account />
          </Route> */}
          <Route path="/recipe-by-ingredient">
            <ByIngredient />
          </Route>
          <Route path="/recipe-by-nutrient">
            <ByNutrient />
          </Route>
          <Route path="/random-recipe">
            <RandomRecipe />
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
