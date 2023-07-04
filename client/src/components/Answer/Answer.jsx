/* eslint-disable no-unused-vars */

/* import React from "react";
import PropTypes from "prop-types";

const Answer = ({ answer }) => {
  return (
    <li key={answer._id}>
      <p>{answer.text}</p>
      <p>Date: {answer.date}</p>
      <p>By: {answer.userName}</p>
    </li>
  );
};

Answer.propTypes = {
  answer: PropTypes.any.isRequired,
};
export default Answer; */
import React from "react";
import PropTypes from "prop-types";

const Answer = ({ answer, onLike, onDislike }) => {
  const handleLike = () => {
    onLike(answer._id);
  };

  const handleDislike = () => {
    onDislike(answer._id);
  };

  return (
    <div>
      <p>{answer.text}</p>
      <button onClick={handleLike}>Like ({answer.likes})</button>
      <button onClick={handleDislike}>Dislike ({answer.dislikes})</button>
    </div>
  );
};

Answer.propTypes = {
  answer: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    dislikes: PropTypes.number.isRequired,
  }).isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
};

export default Answer;
