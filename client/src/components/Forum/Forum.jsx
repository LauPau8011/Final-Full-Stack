/* eslint-disable no-unused-vars */
// components/Forum.js
import React, { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <div>
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

export default Forum;
