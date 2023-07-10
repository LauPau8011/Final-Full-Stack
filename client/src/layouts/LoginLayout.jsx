import PropTypes from "prop-types";

const LoginLayout = ({ children }) => {
  return (
    <div className="login-container">
      <h1>Hello to Forum!</h1>
      {children}
    </div>
  );
};
LoginLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default LoginLayout;
