/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import FormItem from "../../components/FormItem/FormItem";
import Button from "../../components/Button/Button";

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3000/register", {
        name,
        username,
        password,
      });
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Register Page</h2>
      <FormItem
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <FormItem
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <FormItem
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button text="Register" onClick={handleRegister} />
      <p>
        Already registered? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
};

export default Register;
