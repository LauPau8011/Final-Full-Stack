/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/register", {
        name,
        username,
        password,
      });

      console.log(response.data); // gautas naujo vartotojo ID arba kiti duomenys

      // Įvykdyti reikiamus veiksmus po sėkmingo registracijos
      setIsRegistered(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {isRegistered ? (
        <p>
          Registration successful! Go to <Link to="/login">Login</Link> page.
        </p>
      ) : (
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default Register;
