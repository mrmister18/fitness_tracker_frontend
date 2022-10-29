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
                    <h2>{routine.name}</h2>
                    <h3>{routine.goal}</h3>
                    <p>{routine.creatorName}</p>
                    {routine.activities.map((activity) =>{
            return <div className='activity' key={activity.id}>
                    <h2>{activity.name}</h2>
                    <h3>{activity.description}</h3>
                    <p>{activity.duration}</p>
                    <p>{activity.count}</p>
                </div>
        })}
                </div>
        })}
    </div>
}

export default Routines