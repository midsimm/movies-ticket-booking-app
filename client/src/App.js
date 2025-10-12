import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useSelector } from "react-redux";
import ProtectedRoute from './components/protectedRoute';

function App() {
  const loader = useSelector((state) => state.loader.loading);

  console.log("Loader state in App.js:", loader);
  return (
    <div>
      { loader && ((
            <div className="loader-container">
          {" "}
          <div className="loader"> </div>{" "}
        </div>
        ))}
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><HomePage/></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
