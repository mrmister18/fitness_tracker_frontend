import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = (props) => {
  const { Signup } = props;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setLoginToken } = props;
  const navigate = useNavigate();

  async function userLogin(username, password) {
    fetch("https://fitnesstrac-kr.herokuapp.com/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
          setLoginToken(result.token);
          navigate("/");
        } else {
          alert(result.message);
        }
      })
      .catch(console.error);
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          userLogin(userName, password);
        }}
      >
        <label htmlFor="username">Username</label>
        <input
          onChange={(event) => setUserName(event.target.value)}
          id="username"
          name="username"
          type="text"
          placeholder="username"
          required
        ></input>
        <label htmlFor="password">Password</label>
        <input
          onChange={(event) => setPassword(event.target.value)}
          id="password"
          name="password"
          type="password"
          placeholder="password"
          required
        ></input>
        <button>Login</button>
      </form>
      <Link to="/signup">
        <p>Don't have an account? Sign up!</p>
      </Link>
    </div>
  );
};

export default Login;
