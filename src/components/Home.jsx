import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Home = () => {
  const [user, setUser] = useState(null)
  const admin = 'jrm.devweb@gmail.com'




  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz')
  }
  const handleAddQuestion = () => {
    navigate('/create')
  }
  const handleHistory = () => {
    navigate('/history')
  }

  async function signOut() {
    try {
    } catch (error) {
      console.log('error signing out: ', error)
    }
  }
const renderAddQuestion = ()=>{
    if (user?.email === admin){
     return  <button className="quiz-container" onClick={handleAddQuestion}>Add question</button>
    }
}
  return (
    <div className="quiz-container flex-column">
      <h1>Welcome to the Quiz App</h1>
      <button className="quiz-container" onClick={handleStartQuiz}>Start</button>
      <button className="quiz-container" onClick={handleHistory}>History</button>
      {renderAddQuestion()}
      <button className="quiz-container" onClick={signOut}>Log out</button>
    </div>
  )
}
export default Home
