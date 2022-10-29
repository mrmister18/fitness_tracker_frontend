import { createRoot } from "react-dom/client"
import { Link, Route, Routes, BrowserRouter, useParams } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import { Home, Activities, Routines, MyRoutines, Login, Signup } from './components'

const Nav = (props) => {
    const {loginToken, setLoginToken} = props
    return <nav>
    <span className="title">Fitness Trackr</span>
    <Link to="/"><span>Home</span></Link>
    <Link to="/activities"><span>Activities</span></Link>
    <Link to="/routines"><span>Routines</span></Link>
    {loginToken ? <Link to="/myRoutines"><span>myRoutines</span></Link> : null}
    {loginToken ? <Link to="/"><span onClick={() => setLoginToken("")}>Log out</span></Link> : <Link to="/login"><span>Login</span></Link>}
</nav>
}

const App = () => {
    const [loginToken, setLoginToken] = useState(window.localStorage.getItem('loginToken') || "")

    return <BrowserRouter>
    <div>
        <Nav loginToken={loginToken} setLoginToken={setLoginToken}></Nav>
        <Routes>
            <Route path="/" element= {<Home loginToken={loginToken} />}></Route>
            <Route path="/routines" element= {<Routines />}></Route>
            <Route path="/myRoutines" element= {<MyRoutines />}></Route>
            <Route path="/activities" element= {<Activities />}></Route>
            <Route path="/login" element= {<Login setLoginToken={setLoginToken} />}></Route>
            <Route path='/signup' element= {<Signup setLoginToken={setLoginToken} />}></Route>
        </Routes>
    </div>
    </BrowserRouter>
}

const root = createRoot(document.getElementById("app"))
root.render(<App />)