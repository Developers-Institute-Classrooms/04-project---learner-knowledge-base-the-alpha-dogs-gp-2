import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";
import PostAnswer from "./components/PostAnswer";
import PostQuestion from "./components/PostQuestion";
import ViewQuestions from "./components/ViewQuestions";
import "./App.css";
import EditQuestion from "./components/EditQuestion";
import EditAnswer from "./components/EditAnswer";
import ViewAnswers from "./components/ViewAnswers";
import LogInPage from "./components/LogInPage";

const App = () => {
  return (
    <>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/questions/:topicId" element={<ViewQuestions />} />
          <Route path="/postquestion" element={<PostQuestion />} />
          <Route path="/answers/:questionId" element={<ViewAnswers />} />
          <Route path="/postanswer/:questionId" element={<PostAnswer />} />
          <Route path="/editquestion/:questionId" element={<EditQuestion />} />
          <Route path="/editanswer/:answerId" element={<EditAnswer />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LogInPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
