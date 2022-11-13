import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// let question = "TEST";

const PostAnswer = () => {
  const [question, setQuestion] = useState({});

  const { questionId } = useParams();

  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          `${process.env.REACT_APP_API_URL}/answers/${questionId}`
        );

        // fetch error handling

        if (result.ok === false) {
          setError(true);
          return;
        }
        const data = await result.json();
        // console.log(data[0].questiondescription);
        setQuestion(data[0]);
        // question = data[0].questiondescription;
        setIsLoading(false);
        return;
      } catch (error) {
        setError(true);
        console.log("Error fetching products");
      }
    };
    fetchData();
  }, [questionId]);

  console.log("QUESTION: " + question);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // fetching the post route
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/postanswer/${questionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description: answer }),
        }
      );

      if (!response.ok) {
        console.log("Fetch not ok");
        setError(true);
        return;
      } else {
        setIsLoading(false);
        navigate(`/answers/${questionId}`);
      }
    } catch {
      setError(true);
    }
  };

  // error message if API isn't running or fetch is invalid
  if (error) {
    return <p className="list-item">Oops, something went wrong!</p>;
  }

  return (
    <>
      <h1 className="title">Post Answer</h1>
      <p className="question-title">{question.questiondescription}</p>

      <form onSubmit={handleSubmit} className="main-container">
        <input
          type="text"
          required
          id="answer-description"
          name="answer-description"
          className="list-item"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        />
        <button className="list-item" disabled={isLoading}>
          Submit
        </button>
      </form>
    </>
  );
};

export default PostAnswer;
