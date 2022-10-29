import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'

const Activities = (props) => {
    const [activities, setActivities] = useState([])

        async function fetchActivities() {
            fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
  headers: {
    'Content-Type': 'application/json',
  },
}).then(response => response.json())
  .then(result => {
    setActivities(result);
  })
  .catch(console.error);
        }
    useEffect(() => {fetchActivities()}, [])

    return <div className='activities'>
        <h1>Activities</h1>
        {activities.map((activity) =>{
            return <div className='activity' key={activity.id}>
                    <h2>{activity.name}</h2>
                    <h3>{activity.description}</h3>
                </div>
        })}
    </div>
}

export default Activities