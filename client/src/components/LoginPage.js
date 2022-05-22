import React, { useState, useRef } from "react";
import { Button, Row, Col, FormGroup, Form, Container } from "reactstrap";
import UserDetails from "./UserDetails";
import { useAuth } from "../contexts/AuthContext";

// import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  // let history = useNavigate();

  const axios = require("axios");
  const [userPage, setUserPage] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [toaster, setToaster] = useState(false);
  const [loader, setLoader] = useState(false);
  const { signin } = useAuth();
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const submitLogin = (event) => {
    event.preventDefault();
    setLoader(true);

    signin(emailInput.current.value, passwordInput.current.value)
      .then((res) => {
        axios
          .get("/login/" + res.user.multiFactor.user.uid)
          .then((res) => {
            let obj = res && res.data[0];
            if (res.status === 200 && res.data.length !== 0) {
              setUserPage(true);
              setUserDetails(obj);
              setLoader(false);

              // history("user-details");
            } else {
              setUserPage(false);
              setToaster(true);
            }
          })
          .catch((err) => {});
      })
      .catch((err) => {
        setToaster(true);
      });
  };

  return (
    <>
      {!userPage ? (
        <Container>
          <Row
            className="d-flex justify-content-center align-items-center"
            style={{ textAlign: "center", marginTop: "10%" }}
          >
            <Col xs="6" className="mt-2">
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
                      {toaster && (
                        <p style={{ color: "red" }}>User not found!</p>
                      )}
                    </Col>
                  </Row>
                </FormGroup>

                <FormGroup>
                  <div className="d-flex justify-content-center align-items-center">
                    {!loader ? (
                      <Button type="submit">Submit</Button>
                    ) : (
                      <Button disabled={true}>Loading...</Button>
                    )}
                  </div>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      ) : (
        <UserDetails userDetails={userDetails} />
      )}
    </>
  );
};

export default LoginPage;
