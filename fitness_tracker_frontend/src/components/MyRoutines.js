import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const MyRoutines = ({
  loginToken,
  setGoal,
  goal,
  setName,
  name,
  setIsPublic,
  isPublic,
  user,
}) => {
  const [myRoutines, setMyRoutines] = useState([]);

  async function fetchMyRoutines() {
    fetch(`https://fitnesstrac-kr.herokuapp.com/api/users/${user}/routines`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginToken}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setMyRoutines(result);
      })
      .catch(console.error);
  }

  async function createRoutine(name, goal, isPublic) {
    fetch("https://fitnesstrac-kr.herokuapp.com/api/routines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginToken}`,
      },
      body: JSON.stringify({
        name: name,
        goal: goal,
        isPublic: isPublic,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch(console.error);
  }
  useEffect(() => {
    fetchMyRoutines(user.username);
  }, []);
  return (
    <div className="myRoutines">
      <h1>myRoutines</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          createRoutine(name, goal, isPublic);
          fetchMyRoutines();
        }}
      >
        <label htmlFor="name">Name</label>
        <input
          onChange={(event) => setName(event.target.value)}
          id="name"
          required
        ></input>
        *<br />
        <label htmlFor="description">Goal</label>
        <input
          onChange={(event) => setGoal(event.target.value)}
          id="description"
          required
        ></input>
        *<br />
        <label htmlFor="isPublic">Public?</label>
        <input
          type="checkbox"
          onChange={() => (isPublic ? setIsPublic(false) : setIsPublic(true))}
        ></input>
        <br />
        <button>Create</button>
      </form>
      {myRoutines.map((routine) => {
        return (
          <div className="routine" key={routine.id}>
            <h2>{routine.name}</h2>
            <h3>{routine.goal}</h3>
            <p>{routine.creatorName}</p>
            <p>{routine.isPublic}</p>
            {routine.activities.map((activity) => {
              return (
                <div className="activity" key={activity.id}>
                  <h2>{activity.name}</h2>
                  <h3>{activity.description}</h3>
                  <p>{activity.duration}</p>
                  <p>{activity.count}</p>
                </div>
              );
            })}
            <Link to={`/myRoutines/${routine.id}`}>
              <button
                onClick={() => {
                  setName(routine.name);
                  setGoal(routine.goal);
                  setIsPublic(routine.isPublic);
                }}
              >
                Edit Post
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default MyRoutines;
