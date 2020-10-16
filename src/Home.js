import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import IngredientPic from "./images/ByIngredient.jpg";
import NutrientPic from "./images/ByNutrient.jpg";
import styles from "./partials/Styles";
import RandomLightBox from "./partials/RandomLightbox";

const Home = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={6} md={4}>
            <Link to="/recipe-by-ingredient">
              <Image
                style={styles.imageAdjust}
                src={IngredientPic}
                alt="FindByIngredient"
                thumbnail
                fluid
              />
              <h2 style={styles.setFont}>RECIPES</h2>
              <h3 style={styles.setFont}>FIND BY INGREDIENTS</h3>
            </Link>
          </Col>
          <Col xs={6} md={4}>
            <Link to="/recipe-by-nutrient">
              <Image src={NutrientPic} alt="FindByNutrient" thumbnail fluid />
              <h2 style={styles.setFont}>RECIPES</h2>
              <h3 style={styles.setFont}>FIND BY NUTRIENTS</h3>
            </Link>
          </Col>
          <Col xs={6} md={4}>
            <RandomLightBox />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
