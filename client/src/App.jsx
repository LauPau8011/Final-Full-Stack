/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Forum from "./components/Forum/Forum";
import QuestionDetails from "./components/QuestionDetails/QuestionDetails";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

const App = () => {
  return (
    <Router>
      <div>
        <h1>My Forum App</h1>
        <Routes>
          <Route path="/" element={<Forum />} />
          <Route path="/questions/:id" element={<QuestionDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
