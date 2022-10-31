import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'

const Routines = (props) => {
    const [routines, setRoutines] = useState([])

        async function fetchRoutines() {
            fetch('http://fitnesstrac-kr.herokuapp.com/api/routines', {
  headers: {
    'Content-Type': 'application/json',
  },
}).then(response => response.json())
  .then(result => {
    setRoutines(result);
  })
  .catch(console.error);
        }
    useEffect(() => {fetchRoutines()}, [])

    return <div className='routines'>
        <h1>Routines</h1>
        {routines.map((routine) =>{
            return <div className='routine' key={routine.id}>
                    <h2>Routine Name: {routine.name}</h2>
                    <h3>Goal: {routine.goal}</h3>
                    <p>By: {routine.creatorName}</p>
                    <h2>Routine Activities</h2>
                    {routine.activities.map((activity) =>{
            return <div className='activity' key={activity.id}>
                    <h2>Activity Name{activity.name}</h2>
                    <h3>Description: {activity.description}</h3>
                    <p>Duration: {activity.duration}</p>
                    <p>Activity: {activity.count}</p>
                </div>
        })}
                </div>
        })}
    </div>
}

export default Routines