/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Button from "../../components/Button/Button";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
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

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const userQuestions = user && user.questions ? user.questions : [];

  const editQuestion = async (questionId, newText) => {
    try {
      if (user && user.isLoggedIn) {
        await axios.put(`http://localhost:3000/questions/${questionId}`, {
          text: newText,
        });
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question._id === questionId
              ? { ...question, text: newText }
              : question
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteQuestion = async (questionId) => {
    try {
      if (user && user.isLoggedIn) {
        await axios.delete(`http://localhost:3000/questions/${questionId}`);

        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question._id !== questionId)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Profile Page</h2>
      {user && (
        <>
          <p>Username: {user.username}</p>
          <h3>Your Questions:</h3>
          {questions.map((question) => {
            if (user.username === question.userName) {
              return (
                <div key={question._id}>
                  <p>{question.text}</p>
                  {user.isLoggedIn && (
                    <>
                      <input
                        type="text"
                        value={question.text}
                        onChange={(e) =>
                          editQuestion(question._id, e.target.value)
                        }
                      />
                      <Button
                        text="Save"
                        onClick={() =>
                          editQuestion(question._id, question.text)
                        }
                      />
                      <Button
                        text="Delete"
                        onClick={() => deleteQuestion(question._id)}
                      />
                    </>
                  )}
                </div>
              );
            }
            return null;
          })}
        </>
      )}
      <Button text="Logout" onClick={handleLogout} />
    </div>
  );
};

export default Profile;
