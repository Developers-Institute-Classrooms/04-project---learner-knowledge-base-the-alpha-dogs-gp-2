import { useParams } from "react-router-dom";

const ViewQuestions = ({ questionObject }) => {
  const { topicId } = useParams();

  return (
    <>
      <div className="list-item">PARAMETER: {topicId}</div>
      <div className="list-item">PROP: {questionObject}</div>
    </>
  );
};

export default ViewQuestions;
