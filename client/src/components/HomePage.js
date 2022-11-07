import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Link
      to={`/dashboard`}
      state={{ from: "This is the props text" }}
      className="list-item"
      style={{ pointerEvents: true ? "" : "none" }}
    >
      PASS THE PROP TO DASHBOARD
    </Link>
  );
};

export default HomePage;
