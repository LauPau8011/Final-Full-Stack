/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [answerText, setAnswerText] = useState("");

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
        { text: answer }
      );
      fetchQuestions();
      setAnswerText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Forum</h2>
      <ul>
        {questions.map((question) => (
          <li key={question._id}>
            <h3>{question.text}</h3>
            <p>Date: {question.date}</p>
            <p>By: {question.userName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
