import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'

const Home = ({loginToken}) => {
    return loginToken ? <h1>You are logged in</h1> : <h1>You are not logged in</h1>
}

export default Home