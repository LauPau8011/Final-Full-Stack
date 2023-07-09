/* eslint-disable no-unused-vars */
/* import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./Navbar.css";

const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!user && (
          <React.Fragment>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </React.Fragment>
        )}
        {user && (
          <React.Fragment>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/ask">Ask a Question</Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
 */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./Navbar.css";

const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/ask">Ask a Question</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
