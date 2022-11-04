import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const { from } = location.state;
  return <p className="list-item">{from}</p>;
};

export default Dashboard;
