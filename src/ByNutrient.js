import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { Button, Col, Container, Row } from "react-bootstrap";

const ByNutrient = () => {
  const [nutrients, setNutrients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const filterRecipes = async () => {
    const recipeList = await new Promise((resolve) => {
      const recipeCopy = [...recipes];
      recipeCopy.push("test");
      resolve(recipeCopy);
    });
    setRecipes(recipeList);
  };

  const displayRecipes = () => {
    return (
      <Col>
        <Button onClick={filterRecipes} variant="dark">
          Find By Recipes
        </Button>
        {recipes.map((recipe) => (
          <Col>
            <div>{recipe}</div>
          </Col>
        ))}
      </Col>
    );
  };

  const displaySelectedNutrients = () => {
    return nutrients.map((nutrient) => (
      <Row>
        <Col>{nutrient["QTY"]}</Col>
        <Col>{nutrient["Type"]}</Col>
        <Col>{nutrient["Nutrient"]}</Col>
        <Button
          variant="light"
          onClick={() =>
            setNutrients(
              nutrients.filter(
                (remainingNutrients) =>
                  remainingNutrients["Nutrient"] !== nutrient["Nutrient"]
              )
            )
          }
        >
          X
        </Button>
      </Row>
    ));
  };

  const uniqueNutrient = (values) => {
    for (let x in nutrients) {
      if (nutrients[x]["Nutrient"] === values["Nutrient"]) return true;
    }
    return false;
  };

  const nutrientsForm = () => {
    return (
      <Formik
        initialValues={{
          QTY: "",
          Type: "grams",
          Nutrient: "",
        }}
        onSubmit={async (values) => {
          const newNutrients = await new Promise((resolve) => {
            if (uniqueNutrient(values)) alert("Please enter a unique nutrient");
            else if (values.Nutrient.length < 1)
              alert("Please enter a nutrient");
            else {
              const val = [...nutrients];
              val.push(values);
              resolve(val);
            }
          });
          // alert(JSON.stringify(values, null, 2));
          setNutrients(newNutrients);
          console.log(newNutrients);
        }}
      >
        <Form
        // onChange={(e) =>
        //   e.target["name"] === "Nutrient" ? console.log(e.target.value) : null
        // }
        >
          <label htmlFor="QTY">QTY</label>
          <Field id="QTY" name="QTY" placeholder="" type="number" />
          <label htmlFor="Type">Type</label>
          <Field as="select" id="Type" name="Type">
            <option value="grams">grams</option>
            <option value="oz">oz</option>
          </Field>
          <label htmlFor="Nutrient">Nutrient</label>
          <Field id="Nutrient" name="Nutrient" placeholder="" />
          <button type="submit">Add</button>
        </Form>
      </Formik>
    );
  };

  return (
    <>
      <Container>
        <Row>
          <Col>{nutrientsForm()}</Col>
          <Col md="auto">
            <h2>Selected Nutrients</h2>
            {displaySelectedNutrients()}
          </Col>
        </Row>
        <Row>{displayRecipes()}</Row>
      </Container>
    </>
  );
};

export default ByNutrient;
