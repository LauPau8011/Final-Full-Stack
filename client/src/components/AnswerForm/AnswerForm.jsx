/* eslint-disable no-unused-vars */
/* 
import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const AnswerForm = ({ questionId, onAnswerSubmit }) => {
  const [answerText, setAnswerText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/questions/${questionId}/answers`,
        {
          text: answerText,
        }
      );

      const newAnswer = response.data;

      onAnswerSubmit(newAnswer);

      setAnswerText(""); // Išvalome atsakymo tekstą po pateikimo
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter Your answer"
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
        ></textarea>
        <button type="submit">Provide a response</button>
      </form>
    </div>
  );
};

AnswerForm.propTypes = {
  questionId: PropTypes.any.isRequired,
  onAnswerSubmit: PropTypes.func.isRequired,
};

export default AnswerForm;
 */
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AnswerForm.css";

const AnswerForm = ({ questionId, onAnswerSubmit }) => {
  const [answerText, setAnswerText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnswerSubmit(questionId, answerText);
    setAnswerText("");
  };

  return (
    <div>
      <h3>Submit an Answer</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          placeholder="Your answer..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

AnswerForm.propTypes = {
  questionId: PropTypes.any.isRequired,
  onAnswerSubmit: PropTypes.func.isRequired,
};

export default AnswerForm;
