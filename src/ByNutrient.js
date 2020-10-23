import React, { useState } from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import { Col, Container, Row } from "react-bootstrap";
import Axios from "axios";

const ByNutrient = () => {
  const [nutrients, setNutrients] = useState([]);
  // const [recipes, setRecipes] = useState([]);

  // const filterRecipes = async () => {
  //   const recipeList = await new Promise((resolve) => {
  //     const recipeCopy = [...recipes];
  //     recipeCopy.push("test");
  //     resolve(recipeCopy);
  //   });
  //   setRecipes(recipeList);
  // };

  //will display recipes after retrieve from database
  const displayRecipes = () => {
    if (nutrients.length > 0) {
      Axios.post("/recipes/byNutrient", nutrients);

      return (
        <Col>
          {nutrients.map((nutrients) => (
            <Col>
              <div>{nutrients.minmax}</div>
              <div>{nutrients.qty}</div>
              <div>{nutrients.type}</div>
              <div>{nutrients.nutrient}</div>
            </Col>
          ))}
        </Col>
      );
    } else {
      return (
        <Col>
          {nutrients.map((nutrients) => (
            <Col>
              <div>{nutrients.minmax}</div>
              <div>{nutrients.qty}</div>
              <div>{nutrients.type}</div>
              <div>{nutrients.nutrient}</div>
            </Col>
          ))}
        </Col>
      );
    }
  };

  const nutrientsForm = () => {
    return (
      <>
        <Formik
          initialValues={{
            nutrients: [
              { minmax: "min", qty: "", type: "grams", nutrient: "" },
            ],
          }}
          onSubmit={(values) => setNutrients(values.nutrients)}
        >
          {({ values }) => (
            <Form>
              <FieldArray
                name="nutrients"
                render={(arrayHelpers) => (
                  <div>
                    {values.nutrients.map((nutrient, index) => (
                      <div key={index}>
                        <Field as="select" name={`nutrients.${index}.minmax`}>
                          <option value="max">Maximum</option>
                          <option value="min">Minimum</option>
                        </Field>{" "}
                        <Field
                          placeholder="QTY"
                          type="number"
                          name={`nutrients[${index}].qty`}
                        />{" "}
                        <Field as="select" name={`nutrients.${index}.type`}>
                          <option value="grams">grams</option>
                          <option value="oz">oz</option>
                          <option value="lbs">lbs</option>
                          <option value="tbsp">tbsp</option>
                          <option value="tsps">tsps</option>
                          <option value="quarts">quarts</option>
                          <option value="cups">cups</option>
                        </Field>{" "}
                        <Field
                          placeholder="Nutrient i.e protein, carbs, etc"
                          onClick={() =>
                            values.nutrients[index].nutrient.length > 3 &&
                            !values.nutrients[index + 1]
                              ? arrayHelpers.push({
                                  minmax: "min",
                                  qty: "",
                                  type: "grams",
                                  nutrient: "",
                                })
                              : null
                          }
                          type="text"
                          name={`nutrients.${index}.nutrient`}
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
                          nutrient: "",
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
          <Col>{nutrientsForm()}</Col>
          <Col md="auto">
            <Row>{displayRecipes()}</Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ByNutrient;
