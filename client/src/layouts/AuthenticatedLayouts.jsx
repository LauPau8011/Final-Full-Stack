/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar/Navbar";

const AuthenticatedLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="authenticated-container">{children}</div>
    </>
  );
};

AuthenticatedLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthenticatedLayout;
