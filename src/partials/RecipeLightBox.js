import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Image,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import Axios from "axios";
import _ from "lodash";
import styles from "./Styles";
import MealDayLogo from "../images/Mealday-logo.png";

const RecipeLightBox = (props) => {
  let recipeURL = "";
  try {
    recipeURL = "/recipes/" + props.recipeData.id;
  } catch {
    recipeURL = "/recipes/";
  }
  const [rando, setRando] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    Axios.get(recipeURL)
      .then((res) => setRando(res.data))
      .catch((err) => console.log(err))
      .then(() => setShow(true));
  };

  const modalDisplay = (loaded) => {
    const displayInstructions = () =>
      _.map(rando.analyzedInstructions[0].steps, (n) => (
        <li key={n.number}>{n.step}</li>
      ));
    const IngredientsLift = () => {
      return (
        <>
          <Table responsive>
            <thead>Ingredients</thead>
            {_.map(rando.extendedIngredients, (n) => (
              <tr key={n.name}>
                <td>{_.capitalize(n.name)}</td>
                <td> {n.amount}</td>
                <td>{n.unit}</td>
              </tr>
            ))}
          </Table>
        </>
      );
    };
    const getCalories = () =>
      rando.summary
        .substring(0, rando.summary.indexOf("<a"))
        .replaceAll("<b>", "")
        .replaceAll("</b>", "")
        .replaceAll(".", "")
        .replaceAll(",", "")
        .split(" ")[
        rando.summary
          .substring(0, rando.summary.indexOf("<a"))
          .replaceAll("<b>", "")
          .replaceAll("</b>", "")
          .replaceAll(".", "")
          .replaceAll(",", "")
          .split(" ")
          .indexOf("calories") - 1
      ];
    if (loaded) {
      return (
        <>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Row>
              <Col md="auto">
                <Image
                  style={{ maxHeight: "200px", maxWidth: "auto" }}
                  src={rando.image}
                />
                <Row>Serving Size: {rando.servings}</Row>
                <Row>Calories per Serving: {getCalories()}</Row>
                <Row>Ready In: {rando.readyInMinutes} minutes</Row>
                {IngredientsLift()}
              </Col>
              <Col>
                <Row>
                  <h2>{rando.title}</h2>
                </Row>
                <Row
                  style={{
                    maxHeight: "400px",
                    maxWidth: "auto",
                  }}
                >
                  {rando.summary
                    .substring(0, rando.summary.indexOf("<a"))
                    .replaceAll("<b>", "")
                    .replaceAll("</b>", "")
                    .replace("spoonacular", "Meal Day")}
                </Row>
                <Row>
                  <h3>Directions</h3>
                  <ol>{displayInstructions()}</ol>
                </Row>
              </Col>
            </Row>
          </Modal.Body>
        </>
      );
    } else {
      return (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Random Recipe Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Random Recipe
            {<div>loading...</div>}
          </Modal.Body>
        </>
      );
    }
  };

  const getCalories = (val) => {
    try {
      return val.summary
        .substring(0, val.summary.indexOf("<a"))
        .replaceAll("<b>", "")
        .replaceAll("</b>", "")
        .replaceAll(".", "")
        .replaceAll(",", "")
        .split(" ")[
        val.summary
          .substring(0, val.summary.indexOf("<a"))
          .replaceAll("<b>", "")
          .replaceAll("</b>", "")
          .replaceAll(".", "")
          .replaceAll(",", "")
          .split(" ")
          .indexOf("calories") - 1
      ];
    } catch (err) {
      return null;
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Image
              onClick={handleShow}
              style={styles.recipeList}
              src={props.recipeData.image || MealDayLogo}
              alt={props.recipeData.title}
            />
          </Col>
          <Col>
            <Row onClick={handleShow}>{props.recipeData.title}</Row>
            <Row>Serving Size: {props.recipeData.servings}</Row>
            <Row>Calories per Serving: {getCalories(props.recipeData)}</Row>
            <Row>Ready In: {props.recipeData.readyInMinutes} minutes</Row>
            <Row>
              <button onClick={handleShow}>Full Detail</button>
            </Row>
          </Col>
        </Row>
      </Container>

      <Modal
        //Centers
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        //Centers End
        show={show}
        scrollable={true}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        {modalDisplay(show)}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default RecipeLightBox;
