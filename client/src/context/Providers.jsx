/* eslint-disable no-unused-vars */
import React from "react";
import { UserProvider } from "./UserContext";
import PropTypes from "prop-types";

const Providers = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Providers;
