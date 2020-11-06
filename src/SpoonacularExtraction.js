import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from "axios";
import "./partials/Login.css";

export default function SDE() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return user.length > 0 && password.length > 0;
  }

  const authenticate = (obj) => {
    axios
      .post("/recipes/sde", obj)
      .then((res) => {
        alert("SUCCESS!");
      })
      .catch((res) => alert("ERROR: PLEASE TRY AGAIN"));
  };

  function handleSubmit(event) {
    event.preventDefault();
    authenticate({ user: user, password: password });
  }

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#37b34a" }}>
        Spoonacular Extraction Portal
      </h1>
      <div className="Login">
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <FormLabel>User</FormLabel>
            <FormControl
              autoFocus
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </FormGroup>
          <Button
            style={{ backgroundColor: "#37b34a" }}
            block
            bsSize="large"
            disabled={!validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    </>
  );
}
