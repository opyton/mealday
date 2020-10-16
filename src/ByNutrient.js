import React, { useState } from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import { Col, Container, Row } from "react-bootstrap";

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
    return (
      <Col>
        {nutrients.map((nutrients) => (
          <Col>
            <div>{nutrients.qty}</div>
          </Col>
        ))}
      </Col>
    );
  };

  const nutrientsForm = () => {
    return (
      <>
        <Formik
          initialValues={{
            nutrients: [{ qty: "", type: "grams", nutrient: "" }],
          }}
          onSubmit={(values) => {
            setNutrients(values.nutrients);
            console.log(values.nutrients);
          }}
          render={({ values }) => (
            <Form>
              <FieldArray
                name="nutrients"
                render={(arrayHelpers) => (
                  <div>
                    {values.nutrients.map((nutrient, index) => (
                      <div key={index}>
                        <Field type="number" name={`nutrients[${index}].qty`} />
                        <Field as="select" name={`nutrients.${index}.type`}>
                          <option value="grams">grams</option>
                          <option value="oz">oz</option>
                        </Field>
                        <Field
                          onClick={() =>
                            values.nutrients[index].nutrient.length > 3 &&
                            !values.nutrients[index + 1]
                              ? arrayHelpers.push({
                                  qty: "",
                                  type: "grams",
                                  nutrient: "",
                                })
                              : null
                          }
                          type="text"
                          name={`nutrients.${index}.nutrient`}
                        />

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
        />
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
