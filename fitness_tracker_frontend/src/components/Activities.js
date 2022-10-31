import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'

const Activities = ({loginToken}) => {
  const navigate = useNavigate()
    const [activities, setActivities] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

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

    async function createNewActivity(name, description) {
      fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${loginToken}`},
  body: JSON.stringify({
    name: name,
    description: description
  })
}).then(response => response.json())
  .then(result => {
    if (result.id) {console.log(result)
      navigate('/activities')}
      else {alert(result.message)};
  })
  .catch(console.error);
    }

    return <div className='activities'>
        <h1>Activities</h1>
        {loginToken ? <form onSubmit={(event) => {event.preventDefault()
        createNewActivity(name, description)
        fetchActivities()}}><label htmlFor='name'>Name</label>
        <input onChange={(event) => setName(event.target.value)} id='name' required></input>*<br />
        <label htmlFor='description'>Description</label>
        <input onChange={(event) => setDescription(event.target.value)} id='description' required></input>*<br />
        <button>Create</button></form> : null}
        
        {activities.map((activity) =>{
            return <div className='activity' key={activity.id}>
                    <h2>Name: {activity.name}</h2>
                    <h3>Description: {activity.description}</h3>
                </div>
        })}
    </div>
}

export default Activities