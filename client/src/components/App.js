import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import CreateAccount from "./CreateAccount";
import "../../src/App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/create-account" element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
