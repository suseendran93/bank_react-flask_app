import React, { useState } from "react";
import { Button, Row, Col, FormGroup, Form } from "reactstrap";
const CreateAccount = () => {
  const axios = require("axios");
  const [toggleForm, setToggleForm] = useState(false);
  const [name, setName] = useState("");
  const [acc, setAcc] = useState("");
  const [beneficiary, setBeneficiary] = useState();
  const formToggle = () => {
    setToggleForm(true);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAccChange = (event) => {
    setAcc(event.target.value);
  };
  const accountCreation = (event) => {
    event.preventDefault();
    let acco = parseInt(acc);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ acc: acco, name: name }),
    };
    fetch("/createaccount", requestOptions).then(() => {
      setToggleForm(false);
    });
  };

  const showBeneficiary = () => {
    axios
      .get("/showbeneficiary/" + 32323)
      .then((res) => {
        let obj = res && res.data[0].Beneficiary;
        let array = Object.entries(obj);
        setBeneficiary(array);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="d-flex justify-content-center mt-5">
      <Row style={{ textAlign: "center" }}>
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
          <Col xs="12" className="mt-2">
            <Form onSubmit={accountCreation}>
              <FormGroup>
                <Row className="m-3">
                  <Col xs="12" lg="4">
                    <label>Name</label>
                  </Col>
                  <Col xs="12" lg="8">
                    <input
                      type="text"
                      value={name}
                      onChange={handleNameChange}
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
                    <input type="text" value={acc} onChange={handleAccChange} />
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
        <Col xs="12">
          <Button
            className="mt-2 btn-size"
            color="primary"
            onClick={showBeneficiary}
          >
            Show beneficiary
          </Button>
        </Col>
        {beneficiary && (
          <Col xs="12">
            <div className="d-flex justify-content-center mt-2">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Acc number</th>
                  </tr>
                </thead>
                <tbody>
                  {beneficiary.map((val, key) => {
                    return (
                      <tr key={key}>
                        <td>{val[0]}</td>
                        <td>{val[1]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
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
