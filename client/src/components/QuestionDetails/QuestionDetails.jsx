/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import AnswerForm from "../AnswerForm/AnswerForm";
import Answer from "../Answer/Answer";
import "./QuestionDetails.css";

const QuestionDetails = ({ questionId }) => {
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/questions/${questionId}`
        );
        setQuestion(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestion();
  }, [questionId]);

  const handleAnswerSubmit = async (questionId, answerText) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/questions/${questionId}/answers`,
        {
          text: answerText,
        }
      );
      const newAnswer = response.data;
      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        answers: [...prevQuestion.answers, newAnswer],
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async (answerId) => {
    try {
      await axios.post(`http://localhost:3000/answers/${answerId}/like`);
      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        answers: prevQuestion.answers.map((answer) =>
          answer._id === answerId
            ? { ...answer, likes: answer.likes + 1 }
            : answer
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async (answerId) => {
    try {
      await axios.post(`http://localhost:3000/answers/${answerId}/dislike`);
      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        answers: prevQuestion.answers.map((answer) =>
          answer._id === answerId
            ? { ...answer, dislikes: answer.dislikes + 1 }
            : answer
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {question !== null ? (
        <div>
          <h2>{question.title}</h2>
          <p>{question.description}</p>
          <h3>Answers</h3>
          {question.answers.map((answer) => (
            <Answer
              key={answer._id}
              answer={answer}
              onLike={handleLike}
              onDislike={handleDislike}
            />
          ))}
          <AnswerForm
            questionId={questionId}
            onAnswerSubmit={handleAnswerSubmit}
          />
        </div>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
};

QuestionDetails.propTypes = {
  questionId: PropTypes.string.isRequired,
};

export default QuestionDetails;
