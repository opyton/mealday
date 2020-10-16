import React, { useState } from "react";
import { Button, Col, Image, Modal, Row } from "react-bootstrap";
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
      .then((res) => {
        setRando(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err))
      .then(() => setShow(true));
  };

  const modalDisplay = (loaded) => {
    const displayInstructions = () => {
      const instructions = rando[0].instructions;
      const splitByPeriod = _.split(instructions, "\n");
      return _.map(splitByPeriod, (n) => <li key={n}>{n}</li>);
    };
    const getCalories = () =>
      rando[0].summary
        .substring(0, rando[0].summary.indexOf("<a"))
        .replaceAll("<b>", "")
        .replaceAll("</b>", "")
        .replaceAll(".", "")
        .split(" ")[
        rando[0].summary
          .substring(0, rando[0].summary.indexOf("<a"))
          .replaceAll("<b>", "")
          .replaceAll("</b>", "")
          .replaceAll(".", "")
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
                  src={rando[0].image}
                />
                <Row>Serving Size: {rando[0].servings}</Row>
                <Row>Calories per Serving: {getCalories()}</Row>
                <Row>Ready In: {rando[0].readyInMinutes} minutes</Row>
              </Col>
              <Col>
                <Row>
                  <h2>{rando[0].title}</h2>
                </Row>
                <Row
                  style={{
                    maxHeight: "400px",
                    maxWidth: "auto",
                  }}
                >
                  {rando[0].summary
                    .substring(0, rando[0].summary.indexOf("<a"))
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

  return (
    <>
      <Image
        onClick={handleShow}
        src={SurprisePic}
        alt="SurpriseMe"
        thumbnail
        fluid
      />
      <h2 style={styles.setFont}>SURPRISE ME!</h2>
      <h3 style={styles.setFont}>RECIPE OF THE DAY</h3>

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
