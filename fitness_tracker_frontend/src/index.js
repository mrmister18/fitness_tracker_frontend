import { createRoot } from "react-dom/client";
import {
  Link,
  Route,
  Routes,
  BrowserRouter,
  useParams,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Home,
  Activities,
  Routines,
  MyRoutines,
  Login,
  Signup,
  RoutineEdit,
} from "./components";

const Nav = ({ loginToken, setLoginToken }) => {
  return (
    <nav>
      <span className="title">Fitness Trackr</span>
      <Link to="/">
        <span>Home</span>
      </Link>
      <Link to="/activities">
        <span>Activities</span>
      </Link>
      <Link to="/routines">
        <span>Routines</span>
      </Link>
      {loginToken ? (
        <Link to="/myRoutines">
          <span>myRoutines</span>
        </Link>
      ) : null}
      {loginToken ? (
        <Link to="/">
          <span onClick={() => setLoginToken("")}>Log out</span>
        </Link>
      ) : (
        <Link to="/login">
          <span>Login</span>
        </Link>
      )}
    </nav>
  );
};

const App = () => {
  const [loginToken, setLoginToken] = useState(
    window.localStorage.getItem("loginToken") || ""
  );
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [user, setUser] = useState("");

  async function fetchUser() {
    fetch("https://fitnesstrac-kr.herokuapp.com/api/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginToken}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setUser(result.username);
      })
      .catch(console.error);
  }

  useEffect(() => {
    fetchUser();
    window.localStorage.setItem("loginToken", loginToken);
  }, [loginToken]);

  return (
    <BrowserRouter>
      <div>
        <Nav loginToken={loginToken} setLoginToken={setLoginToken}></Nav>
        <Routes>
          <Route path="/" element={<Home loginToken={loginToken} />}></Route>
          <Route path="/routines" element={<Routines />}></Route>
          <Route
            path="/myRoutines"
            element={
              <MyRoutines
                loginToken={loginToken}
                user={user}
                setName={setName}
                name={name}
                setGoal={setGoal}
                goal={goal}
                setIsPublic={setIsPublic}
                isPublic={isPublic}
              />
            }
          ></Route>
          <Route
            path="/activities"
            element={<Activities loginToken={loginToken} />}
          ></Route>
          <Route
            path="/login"
            element={<Login setLoginToken={setLoginToken} />}
          ></Route>
          <Route
            path="/signup"
            element={<Signup setLoginToken={setLoginToken} />}
          ></Route>
          <Route
            path="/myRoutines/:routineId"
            element={
              <RoutineEdit
                loginToken={loginToken}
                setName={setName}
                name={name}
                setGoal={setGoal}
                goal={goal}
                setIsPublic={setIsPublic}
                isPublic={isPublic}
              />
            }
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const root = createRoot(document.getElementById("app"));
root.render(<App />);
