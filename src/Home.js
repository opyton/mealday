import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import IngredientPic from "./images/ByIngredient.jpg";
import styles from "./partials/Styles";
import RandomLightBox from "./partials/RandomLightbox";

const Home = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col className="mx-auto" xs={8} md={5}>
            <Link to="/recipe-by-ingredient">
              <Image
                rounded
                style={styles.imageAdjust}
                src={IngredientPic}
                alt="FindByIngredient"
                fluid
              />
              <div style={styles.centerTexts}>
                <h2 style={styles.setFont}>
                  RECIPES <br></br>FIND BY INGREDIENTS
                </h2>
              </div>
            </Link>
          </Col>
          <Col className="mx-auto" xs={8} md={5}>
            <RandomLightBox />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
