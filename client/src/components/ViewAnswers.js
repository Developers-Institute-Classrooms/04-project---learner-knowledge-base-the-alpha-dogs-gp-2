import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const ViewAnswers = () => {
  const { questionId } = useParams();

  const [answers, setAnswers] = useState([{ answerdescription: "Loading" }]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5001/answers/${questionId}`
      );
      const data = await response.json();
      if (response.ok === false) {
        setAnswers([{ answerdescription: "Oops, something went wrong!" }]);
        return;
      } else {
        setAnswers(data);
      }
    };
    fetchData();
  }, [questionId]);

  return (
    <>
      <div className="title">{answers[0].questiondescription}</div>
      {answers.map((answer, i) => {
        return (
          <Link
            key={i}
            to={"/editanswers/" + answer.answerid}
            className="list-item"
            style={{ pointerEvents: false ? "" : "none" }}
          >
            {answer.answerdescription}
          </Link>
        );
      })}
    </>
  );
};

export default ViewAnswers;
