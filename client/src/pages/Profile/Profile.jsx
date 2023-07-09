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
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteQuestion = async (questionId) => {
    try {
      if (user && user.isLoggedIn) {
        await axios.delete(`http://localhost:3000/questions/${questionId}`);
        fetchQuestions();
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
          {userQuestions.map((question, index) => (
            <div key={index}>
              <p>{question.question}</p>
              {user.isLoggedIn && (
                <>
                  <input
                    type="text"
                    value={question.text}
                    onChange={(e) => editQuestion(question.id, e.target.value)}
                  />
                  <Button
                    text="Save"
                    onClick={() => editQuestion(question.id, question.text)}
                  />
                  <Button
                    text="Delete"
                    onClick={() => deleteQuestion(question.id)}
                  />
                </>
              )}
            </div>
          ))}
        </>
      )}
      <Button text="Logout" onClick={handleLogout} />
    </div>
  );
};

export default Profile;
