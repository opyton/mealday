import React, { useState } from "react";
import { Button, Col, Image, Modal, Row, Table } from "react-bootstrap";
import styles from "./Styles";
import SurprisePic from "../images/Surprise.jpg";
import Axios from "axios";
import _ from "lodash";

const RandomLightBox = (props) => {
  const [rando, setRando] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    Axios.get("/recipes/random")
      .then((res) => setRando(res.data))
      .catch((err) => console.log(err))
      .then(() => setShow(true));
  };

  const modalDisplay = (loaded) => {
    const displayInstructions = () => {
      try {
        return _.map(rando.analyzedInstructions[0].steps, (n) => (
          <li key={n.number}>{n.step}</li>
        ));
      } catch {
        return null;
      }
    };

    const IngredientsList = () =>
      _.map(rando.extendedIngredients, (n) => (
        <tr key={n.name}>
          <td>{_.capitalize(n.name)}</td>
          <td>
            {_.round(n.amount, 2)} {n.unit}
          </td>
        </tr>
      ));
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
              <Col md="auto" style={styles.leftModalColumnStyling}>
                <Image
                  style={{ maxHeight: "200px", maxWidth: "auto" }}
                  src={rando.image}
                />
                <Table responsive borderless>
                  <thead>Serving Size: {rando.servings}</thead>
                  <thead>Calories per Serving: {getCalories()}</thead>
                  <thead>Ready In: {rando.readyInMinutes} minutes</thead>
                  <br></br>
                  <tr style={styles.leftModalColumnTitleStyling}>
                    <td>Ingredients</td>
                  </tr>
                  <tbody>{IngredientsList()}</tbody>
                </Table>
              </Col>
              <Col>
                <Row>
                  <h2 style={styles.modalTitle}>{rando.title}</h2>
                </Row>
                <Row
                  className="mr-3"
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
                <Row className="mr-3">
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

  return (
    <>
      <Image
        style={styles.imageAdjust}
        onClick={handleShow}
        src={SurprisePic}
        alt="SurpriseMe"
        rounded
        fluid
      />
      <div onClick={handleShow} style={styles.centerTexts}>
        <h2 style={styles.setFont}>
          SURPRISE ME!<br></br>RECIPE OF THE DAY
        </h2>
      </div>

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
export default RandomLightBox;
