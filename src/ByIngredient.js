import React, { useState } from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import { Col, Container, Row } from "react-bootstrap";
import Axios from "axios";
import RecipeLightBox from "./partials/RecipeLightBox";

import _ from "lodash";

const ByIngredient = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  //will display recipes after retrieve from database
  const displayRecipes = () => {
    if (recipes.length > 0) {
      return (
        <>
          {/* <div>
            {ingredients[0].minmax} {ingredients[0].qty} {ingredients[0].type}{" "}
            {ingredients[0].ingredient}
          </div> */}
          {_.map(recipes, (data) => (
            <>
              <Row>
                <RecipeLightBox recipeData={data} />
              </Row>
            </>
          ))}
        </>
      );
    } else {
      return (
        <Col>
          <Col>
            <div>Please enter at least one data point</div>
          </Col>
        </Col>
      );
    }
  };

  const handleSubmit = (values) => {
    Axios.post("/recipes/byIngredient", values.ingredients).then((res) => {
      console.log(res.data);
      setRecipes(res.data);
    });

    // setIngredients(values.ingredients);
    // console.log("values.ingredients: " + JSON.stringify(values.ingredients));
  };
  const ingredientsForm = () => {
    return (
      <>
        <Formik
          initialValues={{
            ingredients: [
              { minmax: "min", qty: "", type: "grams", ingredient: "" },
            ],
          }}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values }) => (
            <Form>
              <FieldArray
                name="ingredients"
                render={(arrayHelpers) => (
                  <div>
                    {values.ingredients.map((ingredient, index) => (
                      <div key={index}>
                        <Field as="select" name={`ingredients.${index}.minmax`}>
                          <option value="max">Maximum</option>
                          <option value="min">Minimum</option>
                        </Field>{" "}
                        <Field
                          placeholder="QTY"
                          type="number"
                          name={`ingredients[${index}].qty`}
                        />{" "}
                        <Field as="select" name={`ingredients.${index}.type`}>
                          <option value="grams">grams</option>
                          <option value="oz">oz</option>
                          <option value="lbs">lbs</option>
                          <option value="tbsp">tbsp</option>
                          <option value="tsps">tsps</option>
                          <option value="quarts">quarts</option>
                          <option value="cups">cups</option>
                        </Field>{" "}
                        <Field
                          placeholder="INGREDIENT i.e. tomato, chicken, etc"
                          onClick={() =>
                            values.ingredients[index].ingredient.length > 3 &&
                            !values.ingredients[index + 1]
                              ? arrayHelpers.push({
                                  minmax: "min",
                                  qty: "",
                                  type: "grams",
                                  ingredient: "",
                                })
                              : null
                          }
                          type="text"
                          name={`ingredients.${index}.ingredient`}
                        />{" "}
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          minmax: "min",
                          qty: "",
                          type: "grams",
                          ingredient: "",
                        })
                      }
                    >
                      Add
                    </button>
                    <button type="submit">Find My Recipes</button>
                  </div>
                )}
              />
            </Form>
          )}
        </Formik>
      </>
    );
  };

  return (
    <>
      <Container>
        <Row>
          <Col>{ingredientsForm()}</Col>
          <Col md="auto">{displayRecipes()}</Col>
        </Row>
      </Container>
    </>
  );
};

export default ByIngredient;
