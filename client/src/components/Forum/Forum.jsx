/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Forum.css";

const Forum = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/questions");
      setQuestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const submitAnswer = async (questionId, answer) => {
    try {
      await axios.post(
        `http://localhost:3000/questions/${questionId}/answers`,
        { answer }
      );
      fetchQuestions(); // Atnaujiname klausimų sąrašą po atsakymo pateikimo
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="forum-container">
      <h2>Forum</h2>
      <ul>
        {questions.map((question) => (
          <li key={question._id}>
            <h3>{question.text}</h3>
            <p>Date: {question.date}</p>
            <p>By: {question.userName}</p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const answer = event.target.elements.answer.value;
                submitAnswer(question._id, answer);
              }}
            >
              <input
                type="text"
                name="answer"
                placeholder="Enter your answer"
              />
              <button type="submit">Submit Answer</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forum;
