/* eslint-disable no-unused-vars */
// QuestionDetails.jsx
/* import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Answer from "../Answer/Answer";
import AnswerForm from "../AnswerForm/AnswerForm";

const QuestionDetails = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetchQuestion();
    fetchAnswers();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/questions/${id}`);
      setQuestion(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAnswers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/questions/${id}/answers`
      );
      setAnswers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnswerSubmit = (newAnswer) => {
    setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
  };

  return (
    <div>
      {question && (
        <div>
          <h3>{question.text}</h3>
          <p>Date: {question.date}</p>
          <p>By: {question.userName}</p>
        </div>
      )}

      <h4>Answers</h4>
      <ul>
        {answers.map((answer) => (
          <Answer key={answer._id} answer={answer} />
        ))}
      </ul>

      <AnswerForm questionId={id} onAnswerSubmit={handleAnswerSubmit} />
    </div>
  );
};

export default QuestionDetails;
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import AnswerForm from "../AnswerForm/AnswerForm";
import Answer from "../Answer/Answer";

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
  questionId: PropTypes.any.isRequired,
};

export default QuestionDetails;
