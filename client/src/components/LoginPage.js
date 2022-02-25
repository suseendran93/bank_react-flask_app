import React from "react";
import { Button, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  let history = useNavigate();

  return (
    <div
      className="d-flex justify-content-center align-items-center "
      style={{ marginTop: "10%" }}
    >
      <Row style={{ textAlign: "center" }}>
        <Col xs="12">
          <Button className="mt-2 btn-size" color="primary">
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
    </div>
  );
};

export default LoginPage;
