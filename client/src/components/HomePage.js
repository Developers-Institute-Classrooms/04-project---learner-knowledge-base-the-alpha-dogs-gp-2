import { useNavigate } from "react-router-dom";

const HomePage = ({ setQuestionObject }) => {
  const navigate = useNavigate(10);
  const e = 5000;

  const handleClick = (choice) => {
    setQuestionObject(5000);
    navigate(`/questions/${e / 2}`);
  };

  return (
    <button value={e} onClick={handleClick} className="list-item">
      {e}
    </button>
  );
};

export default HomePage;
