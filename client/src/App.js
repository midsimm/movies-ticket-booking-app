import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useSelector } from "react-redux";
import ProtectedRoute from './components/protectedRoute';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import SingleMovie from './pages/SingleMovie';
import BookShow from './pages/BookShow';

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
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="/movie/:id/:date" element={<SingleMovie />} />
            <Route path="/bookShow/:showId" element={<BookShow />} />
          </Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
