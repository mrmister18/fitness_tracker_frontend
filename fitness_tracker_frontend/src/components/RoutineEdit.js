import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

const RoutineEdit = ({
  name,
  setName,
  goal,
  setGoal,
  setIsPublic,
  isPublic,
  loginToken,
}) => {
  const { routineId } = useParams();
  const navigate = useNavigate();
  async function editRoutine(name, goal) {
    fetch(`https://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginToken}`,
      },
      body: JSON.stringify({
        name: name,
        goal: goal,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch(console.error);
  }

  async function deleteRoutine() {
    fetch(`https://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginToken}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch(console.error);
  }

  return (
    <div className="editRoutine">
      <h1>Edit Routine</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          editRoutine(name, goal);
          navigate("/myRoutines");
        }}
      >
        <label htmlFor="name">Name</label>
        <input
          onChange={(event) => setName(event.target.value)}
          id="name"
          value={name}
          required
        ></input>
        *<br />
        <label htmlFor="goal">Goal</label>
        <input
          onChange={(event) => setGoal(event.target.value)}
          id="goal"
          value={goal}
          required
        ></input>
        *<br />
        <label htmlFor="isPublic">Public?</label>
        <input
          type="checkbox"
          onChange={() => (isPublic ? setIsPublic(false) : setIsPublic(true))}
          checked={isPublic}
        ></input>
        <br />
        <button>Update Routine</button>
      </form>
      <button
        onClick={() => {
          deleteRoutine();
          navigate("/myRoutines");
        }}
      >
        DELETE ROUTINE
      </button>
    </div>
  );
};

export default RoutineEdit;
