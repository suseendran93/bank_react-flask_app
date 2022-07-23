import React, { useState, useRef } from "react";
import { Button, Row, Col, FormGroup, Form, Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const CreateAccount = () => {
  let history = useNavigate();

  const [toggleForm, setToggleForm] = useState(false);

  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const { signup } = useAuth();
  const formToggle = () => {
    setToggleForm(true);
  };

  const accountCreation = (event) => {
    event.preventDefault();

    signup(emailInput.current.value, passwordInput.current.value)
      .then((res) => {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: res.user.multiFactor.user.uid,
            acc: Math.floor(100000 + Math.random() * 900000),
            name: nameInput.current.value,
          }),
        };
        fetch("/createaccount", requestOptions)
          .then((res) => {
            setToggleForm(false);
            history("/");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row
        className="justify-content-center align-items-center"
        style={{ textAlign: "center", marginTop: "10%" }}
      >
        <Col xs="12">
          <Button
            className="mt-2 btn-size"
            color="primary"
            onClick={formToggle}
          >
            Create Account
          </Button>
        </Col>
        {toggleForm && (
          <Col md="6" className="mt-2">
            <Form onSubmit={accountCreation}>
              <FormGroup>
                <Row className="m-3">
                  <Col xs="12" lg="4">
                    <label>Email address</label>
                  </Col>
                  <Col xs="12" lg="8">
                    <input type="email" ref={emailInput} />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row className="m-3">
                  <Col xs="12" lg="4">
                    <label>Password</label>
                  </Col>
                  <Col xs="12" lg="8">
                    <input type="password" ref={passwordInput} />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row className="m-3">
                  <Col xs="12" lg="4">
                    <label>Name</label>
                  </Col>
                  <Col xs="12" lg="8">
                    <input type="text" ref={nameInput} />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <div className="d-flex justify-content-center align-items-center">
                  <Button type="submit">Submit</Button>
                </div>
              </FormGroup>
            </Form>
          </Col>
        )}
        {/*data && data.members && typeof data.members === "undefined" ? (
        <p>Loading...</p>
      ) : (
        data &&
        data.members &&
        data.members.map((item, id) => <p key={id}>{item}</p>)
      )*/}
      </Row>
    </Container>
  );
};

export default CreateAccount;
