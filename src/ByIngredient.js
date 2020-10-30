import React, { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import { Col, Container, Row } from "react-bootstrap";
import Axios from "axios";
import RecipeLightBox from "./partials/RecipeLightBox";
import _ from "lodash";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

const ByIngredient = () => {
  const [recipes, setRecipes] = useState([]);
  const [whichRecipes, setWhichRecipes] = useState(1);

  //will display recipes after retrieve from database
  const displayRecipes = () => {
    const GenerateRecipeList = () => {
      return _.map(recipes[whichRecipes - 1], (data) => {
        return (
          <Row>
            <RecipeLightBox recipeData={data} />
          </Row>
        );
      });
    };
    const numBoxesGenerator = (length) => {
      let arr = [];
      for (let i = 0; i < length / 5; i++) {
        arr.push(i + 1);
      }
      return arr;
    };
    try {
      if (recipes[0].length > 0) {
        return (
          <>
            {_.map(
              numBoxesGenerator(_.flatMap(recipes, (x) => x).length),
              (n) => {
                if (n > whichRecipes - 3 && n < whichRecipes + 3) {
                  return (
                    <>
                      {" "}
                      <button onClick={() => setWhichRecipes(n)}>
                        {n}
                      </button>{" "}
                    </>
                  );
                } else {
                  return null;
                }
              }
            )}
            {GenerateRecipeList()}
          </>
        );
      } else {
        return (
          <Col>
            <Col>
              <h3>Error Please enter a valid item</h3>
            </Col>
          </Col>
        );
      }
    } catch {
      return (
        <Col>
          <Col>
            <h3>Please enter at least one data point</h3>
          </Col>
        </Col>
      );
    }
  };

  const handleSubmit = (values) => {
    Axios.post("/recipes/byIngredient", values.ingredients).then((res) => {
      setRecipes(_.chunk(res.data, 5));
    });
  };
  const ingredientsForm = () => {
    const top100Ingredients = [
      "Olive oil",
      "Tomato",
      "Flour",
      "Butter",
      "Chicken",
      "Sugar",
      "Salt",
      "Egg",
      "Rice",
      "Vegetable oil",
      "Pork",
      "Beef",
      "Cheese",
      "Garlic",
      "Orange",
      "Turkey",
      "Onion",
      "Corn",
      "Milk",
      "Mayonnaise",
      "Chile",
      "Almond",
      "Bacon",
      "Mushroom",
      "Coconut",
      "Beet",
      "Strawberries",
      "Fennel",
      "Lamb",
      "Apple",
      "Shrimp",
    ];
    return (
      <>
        <Formik
          initialValues={{
            ingredients: [{ ingredient: "" }],
          }}
          // onSubmit={(values) => console.log(values)}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <FieldArray
                name="ingredients"
                render={(arrayHelpers) => (
                  <div>
                    {values.ingredients.map((ingredient, index) => (
                      <div key={index}>
                        <Autocomplete
                          id="combo-box-demo"
                          options={top100Ingredients}
                          onClick={() =>
                            !values.ingredients[index + 1]
                              ? arrayHelpers.push({
                                  ingredient: "",
                                })
                              : null
                          }
                          onChange={(e, value) => {
                            if (!values.ingredients[index + 1])
                              arrayHelpers.push({
                                ingredient: "",
                              });

                            setFieldValue(
                              `ingredients.${index}.ingredient`,
                              _.lowerCase(value)
                            );
                          }}
                          getOptionLabel={(option) => option}
                          // getOptionLabel={(option) => option.title}
                          style={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Ingredient i.e. tomato, chicken, etc"
                              variant="outlined"
                            />
                          )}
                        />
                        {/* <Field
                          placeholder="INGREDIENT i.e. tomato, chicken, etc"
                          onClick={() =>
                            values.ingredients[index].ingredient.length > 3 &&
                            !values.ingredients[index + 1]
                              ? arrayHelpers.push({
                                  ingredient: "",
                                })
                              : null
                          }
                          type="text"
                          name={`ingredients.${index}.ingredient1`}
                        />{" "} */}
                        {/* <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          X
                        </button> */}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
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
          <Col>{displayRecipes()}</Col>
        </Row>
      </Container>
    </>
  );
};

export default ByIngredient;
