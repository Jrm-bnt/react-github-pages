import React, {useEffect, useState} from 'react'
import '../quiz.css'
import {Link} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import {CONSTANT} from "../constant/constant";

const Quiz = () => {
  const [user, setUser] = useState(localStorage.getItem('email'))
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState(null)
  const [question, setQuestion] = useState(null)
  const [proposal, setProposal] = useState(null)
  const [correct_answer, setCorrect_answer] = useState(null)
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  })
  useEffect(() => {
    if (questions && activeQuestion < questions.length+1) {
      setQuestion(questions[activeQuestion].quest)
      setProposal(questions[activeQuestion].options.split(',').map(option => option.trim()))
      setCorrect_answer(questions[activeQuestion].correctAnswer)
    }
  }, [activeQuestion, questions])


  useEffect(() => {
    if (!loading) toast.remove()
    else {
      toast.remove()
      toast.loading('Loading...')
    }
  }, [loading])


  /**
   * Post end Games
   */
  useEffect(() => {
    if (showResult) {
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: user,
          date: new Date(),
          correctAnswer: result.correctAnswers,
          score: result.score,
          wrongAnswers: result.wrongAnswers,

        })
      }
      fetch(`${CONSTANT.BASE_URL}game`, requestOptions)
        .then(res => res.json())
        .then((msg) => {
            console.log(msg)
          }
        ).catch((err) => {
        console.log(err);
      })
    }
  }, [showResult])

  /**
   * GetAll questions
   */
  useEffect(() => {
    fetch(`${CONSTANT.BASE_URL}questions`)
      .then(res => res.json())
      .then(
        (result) => {
          setQuestions(result)
          setLoading(false)
        })
  }, [])


  const onClickNext = () => {
    setSelectedAnswerIndex(null)
    setResult((prev) =>
      selectedAnswer
        ? {
          ...prev,
          score: prev.score + 5,
          correctAnswers: prev.correctAnswers + 1,
        }
        : {...prev, wrongAnswers: prev.wrongAnswers + 1}
    )
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1)
    } else {
      setActiveQuestion(0)
      setShowResult(true)
    }
  }

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index)
    if (index === correct_answer) {
      setSelectedAnswer(true)
    } else {
      setSelectedAnswer(false)
    }
  }
  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)

  const renderQuiz = () => {
    if (!showResult && !loading) {
      return (
        <div>
          <div>
            <span className="active-question-no">{addLeadingZero(activeQuestion + 1)}</span>
            <span className="total-question">/{addLeadingZero(questions?.length)}</span>
          </div>
          <h2>{question}</h2>
          <ul>
            {proposal?.map((answer, index) => (
              <li
                onClick={() => onAnswerSelected(answer, index)}
                key={answer}
                className={selectedAnswerIndex === index ? 'selected-answer' : null}>
                {answer}
              </li>
            ))}
          </ul>
          <div className="flex-right">
            <button onClick={onClickNext} disabled={selectedAnswerIndex === null}>
              {activeQuestion === questions?.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      )
    } else if (showResult && !loading) {
      return (
        <div className="result flex-column">
          <div>
            <h3>Result</h3>
            <p>
              Total Question: <span>{questions?.length}</span>
            </p>
            <p>
              Total Score:<span> {result.score}</span>
            </p>
            <p>
              Correct Answers:<span> {result.correctAnswers}</span>
            </p>
            <p>
              Wrong Answers:<span> {result.wrongAnswers}</span>
            </p>
          </div>
          <div style={{display: "flex", justifyContent: "center"}}>
            <button><Link style={{"textDecoration": "none", color: "white"}} to="/react-github-pages">Home</Link></button>
          </div>
        </div>
      )
    }
  }
  const renderLoading = () => {
    return (
      <Toaster/>
    )
  }
  return (
    <>
      {loading ?
        renderLoading() :
        <div className="quiz-container">
          {renderQuiz()}
        </div>
      }
    </>
  )
}
export default Quiz