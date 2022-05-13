import React, { useState, useRef } from "react";
import { Button, Row, Col, FormGroup, Form } from "reactstrap";
import UserDetails from "./UserDetails";
import { useAuth } from "../contexts/AuthContext";

// import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  // let history = useNavigate();

  const axios = require("axios");
  const [userPage, setUserPage] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [toaster, setToaster] = useState(false);
  const { signin } = useAuth();
  const accInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const submitLogin = (event) => {
    event.preventDefault();
    let acco = parseInt(accInput.current.value);

    signin(emailInput.current.value, passwordInput.current.value)
      .then(() => {
        axios
          .get("/login/" + acco)
          .then((res) => {
            let obj = res && res.data[0];
            if (res.status === 200 && res.data.length !== 0) {
              setUserPage(true);
              setUserDetails(obj);
              // history("user-details");
            } else {
              setUserPage(false);
              setToaster(true);
            }
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
    <>
      {!userPage ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ marginTop: "10%" }}
        >
          <Row style={{ textAlign: "center" }}>
            <Col xs="12" className="mt-2">
              <Form onSubmit={submitLogin}>
                <FormGroup>
                  <Row className="m-3">
                    <Col xs="12" lg="4">
                      <label>Email</label>
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
                      <label>Acc No</label>
                    </Col>

                    <Col xs="12" lg="8">
                      <input type="text" ref={accInput} />
                      {toaster && (
                        <p style={{ color: "red" }}>User not found!</p>
                      )}
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
          </Row>
        </div>
      ) : (
        <Col>{<UserDetails userDetails={userDetails} />}</Col>
      )}
    </>
  );
};

export default LoginPage;
