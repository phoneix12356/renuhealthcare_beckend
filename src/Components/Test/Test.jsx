import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";

const Test = ({ testId, questionsData, setScore }) => {
  const [optionPicked, setOptionPicked] = useState(
    new Array(questionsData.length).fill({ selectedOption: "" })
  );
  const [validationErrors, setValidationErrors] = useState([]);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [timer, setTimer] = useState(questionsData.length * 60); // Example timer
  const [hasSubmittedTest, setHasSubmittedTest] = useState(false);
  const [previousScore, setPreviousScore] = useState(null);
  const userToken = localStorage.getItem("userToken");
  const { user } = useContext(UserContext);
  const authorization = `Bearer ${userToken}`;

  useEffect(() => {
    const checkIfTestAlreadySubmitted = async () => {
      const check = user.completedTests.some((id) => id === testId);
      console.log(check ? "Found" : "notFound");
      if (check) {
        setHasSubmittedTest(true);
        try {
          const scoreCard = await axios.get("http://localhost:5000/api/score", {
            headers: { authorization },
          });
          setPreviousScore(scoreCard.data.score);
        } catch (error) {
          console.error("Error fetching previous score:", error);
        }
      } else {
        try {
          const response = await axios.put(
            `http://localhost:5000/api/user/add-completed-test`,
            { testId },
            {
              headers: { authorization },
            }
          );
          console.log("test waala", response);
        } catch (error) {
          console.error("Error updating completed test:", error);
        }
      }
    };
    checkIfTestAlreadySubmitted();
  }, [testId, user, authorization]);

  // Timer logic
  useEffect(() => {
    if (timer > 0 && !hasSubmittedTest) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval); // Clear the interval when component unmounts
    } else if (timer === 0 && !hasSubmittedTest) {
      handleSubmit(); // Auto-submit when the timer runs out
    }
  }, [timer, hasSubmittedTest]);

  const handleOptionChange = (index, value, qid) => {
    const updatedOptions = [...optionPicked];
    updatedOptions[index] = { questionId: qid, selectedOption: value };
    setOptionPicked(updatedOptions);
    const updatedErrors = [...validationErrors];
    updatedErrors[index] = "";
    setValidationErrors(updatedErrors);
  };

  const validateAnswers = () => {
    const errors = [];
    let isValid = true;
    questionsData.forEach((question, index) => {
      if (!optionPicked[index]?.selectedOption) {
        errors[index] = "Please select an answer.";
        isValid = false;
      } else {
        errors[index] = "";
      }
    });
    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); // Prevent form submission on user action
    if (!validateAnswers()) return;
    try {
      await axios.post(
        "http://localhost:5000/api/score/calculate-score",
        { testId, answers: optionPicked },
        { headers: { authorization } }
      );
      const scoreCard = await axios.get("http://localhost:5000/api/score", {
        headers: { authorization },
      });
      setScore(scoreCard.data.score);
      setPreviousScore(scoreCard.data.score);
      setHasSubmittedTest(true); // Mark test as submitted
    } catch (error) {
      console.error("Error calculating score or fetching score:", error);
    }
  };

  return hasSubmittedTest ? (
    <div className="text-2xl font-bold text-green-500">
      You have already taken the test.
      {previousScore !== null && (
        <div>Your score: {previousScore}</div>
      )}
    </div>
  ) : (
    <div>
      <div className="text-center text-xl font-bold mb-4">
        Time Remaining: {Math.floor(timer / 60)}:
        {("0" + (timer % 60)).slice(-2)} minutes
      </div>
      <form onSubmit={handleSubmit}>
        {questionsData.map((question, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 className="font-bold mb-2">
              {index + 1}. {question.questionText}
            </h3>
            <div>
              {question.options.map((option, optIndex) => (
                <div key={optIndex} className="my-2">
                  <label>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={optionPicked[index]?.selectedOption === option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value, question._id)
                      }
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                </div>
              ))}
              {validationErrors[index] && (
                <div className="text-red-500 text-sm">
                  {validationErrors[index]}
                </div>
              )}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Submit Test
        </button>
      </form>
    </div>
  );
};

export default Test;