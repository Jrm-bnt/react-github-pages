import React from "react"
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
/**
 * Import component
 */
import Home from "./components/Home"
import Quiz from "./components/Quiz"
import Connection from "./components/connection"
import History from "./components/History";
import QuestionForm from "./components/questionForm"
import List from "./components/List";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/react-github-pages" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/auth" element={<Connection/>} />
        <Route path="/create" element={<QuestionForm/>} />
        <Route path="/list" element={<List/>} />
        <Route path="/history" element={<History/>} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  )
}
function NoMatch() {
    console.log(window.location.href)
  return (
    <div className="quiz-container flex-column" >
      <h1>Nothing to see here!</h1>
      <button className="quiz-container"><Link style={{"textDecoration": "none", color:"white"}} to="/react-github-pages/">Go to the home page</Link></button>
    </div>
  )
}
export default App