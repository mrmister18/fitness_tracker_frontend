import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { setLoginToken } = props;
  const navigate = useNavigate();

  async function registerNewUser(username, password) {
    fetch("https://fitnesstrac-kr.herokuapp.com/api/users/register", {
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
    <div className="signup">
      <h1>Sign up</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          registerNewUser(newUserName, newPassword);
        }}
      >
        <label htmlFor="username">Username</label>
        <input
          onChange={(event) => setNewUserName(event.target.value)}
          id="username"
          placeholder="username"
          name="username"
          type="text"
        ></input>
        <label htmlFor="password">Password</label>
        <input
          onChange={(event) => setNewPassword(event.target.value)}
          id="password"
          placeholder="password"
          name="password"
          type="password"
        ></input>
        <button>Register</button>
      </form>
    </div>
  );
};

export default Signup;
