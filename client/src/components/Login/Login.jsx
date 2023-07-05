/* /* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      onLogin(username); // Perduokime prisijungusio vartotojo vardą tėviniui komponentui
      setUsername("");
      setPassword("");
    }
  }, [isLoggedIn, onLogin, username]);

  const handleLogin = () => {
    // Patikrinkime, ar vartotojo vardas ir slaptažodis yra teisingi
    if (username === "admin" && password === "password") {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="User name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Do not have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
