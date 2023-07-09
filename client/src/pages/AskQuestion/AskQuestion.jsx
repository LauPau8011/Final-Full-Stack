/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import FormItem from "../../components/FormItem/FormItem";
import Button from "../../components/Button/Button";
import axios from "axios";

const AskQuestion = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [questionText, setQuestionText] = useState("");
  const [questionId, setQuestionId] = useState("");

  const handleAskQuestion = async () => {
    try {
      const response = await axios.post("http://localhost:3000/questions", {
        content: questionText,
        userName: user.username,
      });
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditQuestion = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/questions/${questionId}`,
        {
          text: questionText,
        }
      );
      if (response.status === 200) {
        console.log("Question updated");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteQuestion = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/questions/${questionId}`
      );
      if (response.status === 200) {
        console.log("Question deleted");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Ask a Question</h2>
      <FormItem
        label="Your question"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />
      {user ? (
        <>
          <Button text="Submit" onClick={handleAskQuestion} />
          <Button text="Edit" onClick={handleEditQuestion} />
          <Button text="Delete" onClick={handleDeleteQuestion} />
        </>
      ) : (
        <p>Please login to ask a question.</p>
      )}
    </div>
  );
};

export default AskQuestion;
