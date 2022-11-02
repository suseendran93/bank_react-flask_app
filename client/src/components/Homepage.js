import React from "react";
import { Button, Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  let history = useNavigate();
  return (
    // <div>
    //   {/* <Row> */}
    //   {/* <Col xs="8"></Col> */}
    //   {/* <Col xs="4"> */}
    <Row
      className="row-container"
      // className="justify-content-center align-items-center"
      style={{ textAlign: "center", margin: 0 }}
    >
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
    </Row>
    //   {/* </Col> */}
    //   {/* </Row> */}
    // </div>
  );
};

export default Homepage;
