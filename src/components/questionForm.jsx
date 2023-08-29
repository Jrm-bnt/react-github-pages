import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import toast, {Toaster} from 'react-hot-toast'
import {CONSTANT} from "../constant/constant";

const QuestionForm = () => {
  const [question, setQuestion] = useState('')
  const [suggestions, setSuggestions] = useState(['', '', '', ''])
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0)
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  useEffect(() => {
    fetch(`${CONSTANT.BASE_URL}qcm`)
      .then(res => res.json())
      .then((result) => {
        setCount(result.Count)
      })
  }, [])
  const handleQuestionChange = (event) => {
    setQuestion(event.target.value)
  }
  const handleSuggestionChange = (event, index) => {
    const updatedSuggestions = [...suggestions]
    updatedSuggestions[index] = event.target.value
    setSuggestions(updatedSuggestions)
  }
  const handleCorrectAnswerChange = (event) => {
    setCorrectAnswerIndex(parseInt(event.target.value, 10))
  }
  const handleHome = () => {
    navigate('/')
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: count,
        question: question,
        proposal: suggestions,
        correct_answer: suggestions[correctAnswerIndex]
      })
    }
    fetch(`${CONSTANT.BASE_URL}qcm`, requestOptions)
      .then(res => res.json())
      .then(
        async (result) => {
          console.log(result);
          if (result) toast.success(result.message, {duration: 4000, position: 'top-center'})
          await sleep(1500)
          handleHome()
        },
        (error) => {
          console.log('\x1b[32m%s\x1b[0m', 'error', error)
        }
      )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Toaster/>
      <div className="form-container">
        <div className="text-form">
          <label>Question:</label>
          <input
            className="input-form question"
            type="text" value={question} onChange={handleQuestionChange}/>
        </div>
        <div className="text-form">
          {suggestions.map((suggestion, index) => (
            <div key={index}>
              <label>Suggestion {index + 1}:</label>
              <input
                className="input-form"
                type="text"
                value={suggestion}
                onChange={(event) => handleSuggestionChange(event, index)}
              />
            </div>
          ))}
        </div>
        <div className="text-form">
          <label>Correct Answer:</label>
          <select className="input-form suggestions" value={correctAnswerIndex} onChange={handleCorrectAnswerChange}>
            {suggestions.map((_, index) => (
              <option key={index} value={index}>
                Suggestion {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-center">
          <button type="submit">Submit</button>
          <button><Link style={{"textDecoration": "none", color: "white"}} to="/">Cancel</Link></button>
        </div>
      </div>
    </form>
  )
}

export default QuestionForm