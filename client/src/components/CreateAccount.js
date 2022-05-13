import React, { useState, useRef } from "react";
import { Button, Row, Col, FormGroup, Form } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const CreateAccount = () => {
  let history = useNavigate();

  const [toggleForm, setToggleForm] = useState(false);
  // const [name, setName] = useState("");
  // const [acc, setAcc] = useState("");
  const accInput = useRef(null);
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const { signup } = useAuth();
  const formToggle = () => {
    setToggleForm(true);
  };

  // const handleNameChange = (event) => {
  //   setName(event.target.value);
  // };

  // const handleAccChange = (event) => {
  //   setAcc(event.target.value);
  // };
  const accountCreation = (event) => {
    event.preventDefault();

    let acco = parseInt(accInput.current.value);
    signup(emailInput.current.value, passwordInput.current.value)
      .then(() => {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            acc: acco,
            name: nameInput.current.value,
          }),
        };
        fetch("/createaccount", requestOptions).then(() => {
          setToggleForm(false);
          history("/");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ marginTop: "10%" }}
    >
      <Row style={{ textAlign: "center" }}>
        <Col xs="4">
          <Button
            className="mt-2 btn-size"
            color="primary"
            onClick={formToggle}
          >
            Create Account
          </Button>
        </Col>
        {toggleForm && (
          <Col xs="12" className="mt-2">
            <Form onSubmit={accountCreation}>
              <FormGroup>
                <Row className="m-3">
                  <Col xs="12" lg="4">
                    <label>Email address</label>
                  </Col>
                  <Col xs="12" lg="8">
                    <input
                      type="email"
                      // value={name}
                      ref={emailInput}
                      // onChange={handleNameChange}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row className="m-3">
                  <Col xs="12" lg="4">
                    <label>Password</label>
                  </Col>
                  <Col xs="12" lg="8">
                    <input
                      type="password"
                      // value={name}
                      ref={passwordInput}
                      // onChange={handleNameChange}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row className="m-3">
                  <Col xs="12" lg="4">
                    <label>Name</label>
                  </Col>
                  <Col xs="12" lg="8">
                    <input
                      type="text"
                      // value={name}
                      ref={nameInput}
                      // onChange={handleNameChange}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row className="m-3">
                  <Col xs="12" lg="4">
                    <label>Account number</label>
                  </Col>

                  <Col xs="12" lg="8">
                    <input
                      type="text"
                      // value={acc}
                      ref={accInput}
                      // onChange={handleAccChange}
                    />
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
      </Row>
      {/*data && data.members && typeof data.members === "undefined" ? (
        <p>Loading...</p>
      ) : (
        data &&
        data.members &&
        data.members.map((item, id) => <p key={id}>{item}</p>)
      )*/}
    </div>
  );
};

export default CreateAccount;
