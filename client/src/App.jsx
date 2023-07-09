/* eslint-disable no-unused-vars */
/* import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Forum from "./components/Forum/Forum";
import QuestionDetails from "./components/QuestionDetails/QuestionDetails";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import "./App.css";

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
 */

/* import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import AskQuestion from "./pages/AskQuestion/AskQuestion";

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ask" element={<AskQuestion />} />
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
 */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes />
      </Router>
    </UserProvider>
  );
};

export default App;
