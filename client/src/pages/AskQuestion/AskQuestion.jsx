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
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAskQuestion = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/questions`, {
        text: questionText,
        userName: user.username,
      });
      if (response.status === 200) {
        setQuestionId(response.data);
        const storedQuestions =
          JSON.parse(localStorage.getItem("questions")) || [];
        storedQuestions.push({
          id: response.data,
          text: questionText,
          userName: user.username,
        });
        localStorage.setItem("questions", JSON.stringify(storedQuestions));
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditQuestion = async () => {
    try {
      setIsEditing(true);
      const response = await axios.put(
        `http://localhost:3000/questions/${questionId}`,
        {
          text: questionText,
        }
      );
      if (response.status === 200) {
        console.log("Question updated");
        setIsEditing(false);
      }
    } catch (error) {
      console.error(error);
      setIsEditing(false);
    }
  };

  const handleDeleteQuestion = async () => {
    try {
      setIsDeleting(true);
      const response = await axios.delete(
        `http://localhost:3000/questions/${questionId}`
      );
      if (response.status === 200) {
        console.log("Question deleted");
        setIsDeleting(false);
      }
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
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
          {questionId && !isEditing && !isDeleting && (
            <>
              <Button text="Edit" onClick={handleEditQuestion} />
              <Button text="Delete" onClick={handleDeleteQuestion} />
            </>
          )}
        </>
      ) : (
        <p>Please login to ask a question.</p>
      )}
    </div>
  );
};

export default AskQuestion;
