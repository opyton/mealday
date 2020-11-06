import React, { useEffect, useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Axios from "axios";
import RecipeLightBox from "./partials/RecipeLightBox";
import _ from "lodash";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import styles from "./partials/Styles";

const ByIngredient = () => {
  const [recipes, setRecipes] = useState([]);
  const [whichRecipes, setWhichRecipes] = useState(1);
  const [ingredientList, setIngredientList] = useState();
  const [queryMade, setQueryMade] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Axios.get("/recipes/ingredientList").then((res) =>
      setIngredientList(_.uniq(res.data.ingredientList))
    );
  }, []);

  //will display recipes after retrieve from database
  const displayRecipes = () => {
    const GenerateRecipeList = () => {
      return _.map(recipes[whichRecipes - 1], (data) => {
        return (
          <>
            <Row>
              <br></br>
            </Row>
            <Row>
              <RecipeLightBox recipeData={data} />
            </Row>
          </>
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
        if (loading) {
          return (
            <div style={{ textAlign: "center" }}>
              <Spinner
                style={{ color: "#37b34a" }}
                animation="border"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          );
        }
        return (
          <>
            {_.map(
              numBoxesGenerator(_.flatMap(recipes, (x) => x).length),
              (n) => {
                if (n > whichRecipes - 3 && n < whichRecipes + 3) {
                  return (
                    <>
                      {" "}
                      <button
                        style={styles.numBoxes}
                        onClick={() => setWhichRecipes(n)}
                      >
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
      }
    } catch {
      if (loading) {
        return (
          <div style={{ textAlign: "center" }}>
            <Spinner
              style={{ color: "#37b34a" }}
              animation="border"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        );
      }
      if (queryMade) {
        return (
          <Col>
            <Col style={{ color: "red", fontWeight: "bold" }}>
              No recipes found: please select different ingredients!
            </Col>
          </Col>
        );
      }
    }
  };

  const handleSubmit = (values) => {
    setLoading(true);
    Axios.post("/recipes/byIngredient", values.ingredients)
      .then((res) => {
        setRecipes(_.chunk(res.data, 4));
      })
      .then(() => {
        setWhichRecipes(1);
        setQueryMade(true);
        setLoading(false);
      });
  };
  const ingredientsForm = (ingredientArr) => {
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
                        <br />
                        <Autocomplete
                          name={`ingredients.${index}`}
                          id="combo-box-demo"
                          options={ingredientArr}
                          onClick={() =>
                            !values.ingredients[index + 1]
                              ? arrayHelpers.push({
                                  ingredient: "",
                                })
                              : null
                          }
                          onChange={(e, value) => {
                            try {
                              if (e.currentTarget.title === "Clear") {
                                console.log(arrayHelpers);
                                arrayHelpers.remove(index);
                              }
                            } catch {
                              console.log("caught");
                            }
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
                          // style={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Ingredient"
                              variant="standard"
                            />
                          )}
                        />
                      </div>
                    ))}
                    {/* <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          ingredient: "",
                        })
                      }
                    >
                      Add
                    </button> */}
                    <br></br>
                    <button
                      class="float-left"
                      style={styles.findMyRecipes}
                      type="submit"
                    >
                      Find My Recipes
                    </button>
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
          <Col className="mx-auto" xs={8} md={5}>
            {ingredientsForm(ingredientList)}
          </Col>
          <Col xs={8} md={5}>
            {displayRecipes()}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ByIngredient;
