import React, { useState } from "react";
import {
  Button,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  Form,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const UserDetails = ({ userDetails }) => {
  let history = useNavigate();
  const axios = require("axios");
  const [beneficiary, setBeneficiary] = useState();
  const [toggleBeneficiary, setToggleBeneficiary] = useState(false);
  const [name, setName] = useState("");
  const [acc, setAcc] = useState("");
  const [modal, setModal] = useState(false);
  const { signout } = useAuth();
  const toggle = () => setModal(!modal);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    signout()
      .then(() => {
        history("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAccChange = (event) => {
    setAcc(event.target.value);
  };
  const transferFund = (event, toAcc) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromAcc: userDetails.Acc,
        toAcc: toAcc,
        fund: userDetails.Balance,
        amount: 50,
      }),
    };
    fetch("/transferfund", requestOptions).then(() => {
      axios
        .get("/login/" + userDetails.Acc)
        .then((res) => {
          let obj = res && res.data[0];
          userDetails.Balance = obj.Balance;
          setToggleBeneficiary(!toggleBeneficiary);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const addBeneficiary = (event) => {
    event.preventDefault();
    let acco = parseInt(acc);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromAcc: userDetails.Acc,
        toAcc: acco,
        name: name,
      }),
    };
    fetch("/addBeneficiary", requestOptions).then(() => {
      toggle();
    });
  };
  const showBeneficiary = (event) => {
    setToggleBeneficiary(!toggleBeneficiary);

    event.preventDefault();
    axios
      .get("/showbeneficiary/" + userDetails.Acc)
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
    <div>
      <div className="m-2" style={{ textAlign: "right" }}>
        <Button
          className="mt-2 btn-size"
          color="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <div style={{ textAlign: "center" }}>
        <Col>
          <h2>WELCOME TO USER PAGE</h2>
          {userDetails && (
            <div>
              <p>Name: {userDetails.Name}</p>
              <p>Account No: {userDetails.Acc}</p>
              <p>Balance: {userDetails.Balance}</p>
            </div>
          )}
        </Col>
        <Col xs="12">
          <Button className="mt-2 btn-size" color="primary" onClick={toggle}>
            Add Beneficiary
          </Button>
        </Col>
        <Col xs="12">
          <Button
            className="mt-2 btn-size"
            color="primary"
            onClick={showBeneficiary}
          >
            {toggleBeneficiary ? "Hide beneficiary" : "Show beneficiary"}
          </Button>
        </Col>

        {toggleBeneficiary && beneficiary && (
          <div className="d-flex justify-content-center mt-2">
            <Col xs="4">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Acc number</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {beneficiary.map((val, key) => {
                    return (
                      <tr key={key}>
                        <td>{val[0]}</td>
                        <td>{val[1]}</td>
                        <td>
                          <Button
                            className="btn-size"
                            color="primary"
                            onClick={(event) => transferFund(event, val[1])}
                          >
                            Transfer (50)
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Col>
          </div>
        )}
      </div>
      <>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader className="justify-content-center">
            Enter Beneficiary details
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={addBeneficiary}>
              <FormGroup>
                <Row className="m-3">
                  <Col xs="4" lg="4">
                    <label>Name</label>
                  </Col>

                  <Col xs="8" lg="8">
                    <input
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </Col>
                </Row>
                <Row className="m-3">
                  <Col xs="4" lg="4">
                    <label>Account number</label>
                  </Col>

                  <Col xs="8" lg="8">
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
          </ModalBody>
        </Modal>
      </>
    </div>
  );
};

export default UserDetails;
