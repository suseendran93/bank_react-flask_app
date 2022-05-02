import React from "react";
import { Button, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  let history = useNavigate();
  return (
    <div style={{ textAlign: "center", marginTop: "10%" }}>
      <Col xs="12">
        <Button
          className="mt-2 btn-size"
          color="primary"
          onClick={() => history("/login")}
        >
          Login
        </Button>
      </Col>
      <Col xs="12">
        <Button
          className="mt-2 btn-size"
          color="primary"
          onClick={() => history("/create-account")}
        >
          Signup
        </Button>
      </Col>
    </div>
  );
};

export default Homepage;
