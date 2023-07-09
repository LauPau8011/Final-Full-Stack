import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import FormItem from "../../components/FormItem/FormItem";
import Button from "../../components/Button/Button";
import { REGISTER_ROUTE } from "../../routes/const";
import Navbar from "../../components/Navbar/Navbar";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });
      console.log(response.data);
      if (response.status === 200) {
        setUser({ username });
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
      setError("Login failed. Please check your username and password.");
    }
  };

  return (
    <div className="container">
      <Navbar />
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <FormItem
          label="UserName"
          containerClassname="form-item"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <FormItem
          label="Password"
          containerClassname="form-item"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <div className="button-container">
          <Button text="Login" onClick={handleLogin} />
          <Link to={REGISTER_ROUTE}>Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
