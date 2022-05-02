import React, { useState } from "react";
import { Button, Row, Col, FormGroup, Form } from "reactstrap";
import UserDetails from "./UserDetails";
// import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  // let history = useNavigate();

  const axios = require("axios");
  const [acc, setAcc] = useState("");
  const [userPage, setUserPage] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [toaster, setToaster] = useState(false);

  const submitLogin = (event) => {
    event.preventDefault();
    let acco = parseInt(acc);
    axios
      .get("/login/" + acco)
      .then((res) => {
        let obj = res && res.data[0];
        if (res.status === 200 && res.data.length !== 0) {
          setUserPage(true);
          setUserDetails(obj);
          // history("/user-details");
        } else {
          setUserPage(false);
          setToaster(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAccChange = (event) => {
    setAcc(event.target.value);
  };
  return (
    <div>
      {!userPage ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ marginTop: "10%" }}
        >
          <Col xs="4" className="mt-2">
            <Form onSubmit={submitLogin}>
              <FormGroup>
                <Row className="m-3">
                  <Col xs="12" lg="4">
                    <label>Account number</label>
                  </Col>

                  <Col xs="12" lg="8">
                    <input type="text" value={acc} onChange={handleAccChange} />
                    {toaster && <p style={{ color: "red" }}>User not found!</p>}
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
        </div>
      ) : (
        <Col>{<UserDetails userDetails={userDetails} />}</Col>
      )}
    </div>
  );
};

export default LoginPage;
