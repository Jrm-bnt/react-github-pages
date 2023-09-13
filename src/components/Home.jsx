import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Home = (props) => {

    const email = localStorage.getItem('email')
    const navigate = useNavigate();
    const handleStartQuiz = () => {
        navigate('/quiz')
    }

    const handleHistory = () => {
        navigate('/history')
    }
    const handleList = () => {
        navigate('/list')
    }

    async function signOut() {
        try {
            props.setToken(null)
            localStorage.removeItem("token");
            navigate('/login')
        } catch (error) {
            console.log('error signing out: ', error)
        }
    }

    return (
        <div className="quiz-container flex-column">
            <h1>Welcome to the Quiz App</h1>
            <button className="quiz-container" onClick={handleStartQuiz}>Start</button>
            <button className="quiz-container" onClick={handleHistory}>History</button>
            <button className="quiz-container" onClick={handleList}>List of questions</button>
            <button className="quiz-container" onClick={signOut}>Log out</button>
            <p>{email}</p>
        </div>
    )
}
export default Home
