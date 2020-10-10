import React from "react";
import { Navbar } from "react-bootstrap";
import styles from "./Styles";

const Footer = () => {
  return (
    <>
      <Navbar style={{ backgroundColor: "#222222" }} fixed="bottom">
        <Navbar.Text className="m-auto">
          <span style={styles.footerText}>
            ©2020 COMSPARC. All Rights Reserved
          </span>
        </Navbar.Text>
      </Navbar>
    </>
  );
};

export default Footer;
