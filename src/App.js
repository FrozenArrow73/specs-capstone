import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Head from "./components/Head";
import Foot from "./components/Foot";
import Login from "./screens/Login";
import PracticeAll from "./screens/PracticeAll";
import PracticeMistake from "./screens/PracticeMistake";
import PersonalLibrary from "./screens/PersonalLibrary";
import PublicLibrary from "./screens/PublicLibrary";
import AuthContext from "./store/authContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [publicBooks, setPublicBooks] = useState([]);
  const [personalBooks, setPersonalBooks] = useState([]);

  const [isAuthorized, setIsAuthorized] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/authorization", {
        headers: { authorization: authContext.token },
      })
      .then((res) => {
        setIsAuthorized(true);
      })
      .catch((err) => {
        console.log(err);
        setIsAuthorized(false);
        authContext.logout();
      });
  }, [authContext.token]);

  useEffect(() => {
    if (isAuthorized) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isAuthorized]);

  return (
    <div className="App">
      <Head />
      <div className="body">
        <Routes>
          <Route
            path="/"
            element={isAuthorized ? <PracticeAll /> : <Navigate to="/login" />}
          />
          <Route
            path="/mistakes"
            element={
              isAuthorized ? <PracticeMistake /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/personal"
            element={
              isAuthorized ? <PersonalLibrary /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/public"
            element={
              isAuthorized ? (
                <PublicLibrary
                  setPersonalBooks={setPersonalBooks}
                  publicBooks={publicBooks}
                  setPublicBooks={setPublicBooks}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Foot isAuthorized={isAuthorized} />
    </div>
  );
}

export default App;
