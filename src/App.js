import React, {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route, Link, Navigate, HashRouter} from 'react-router-dom';

import Home from "./components/Home"
import Quiz from "./components/Quiz"
import History from "./components/History";
import QuestionForm from "./components/questionForm"
import List from "./components/List";
import Login from "./components/login";
import Register from "./components/register";

function App() {
    const [isAuthenticated, setStateIsAuthenticated] = useState(localStorage.getItem('token'));

    return (
        <HashRouter>
            <Routes>
                <Route path="/react-github-pages" element={isAuthenticated ? <Home setToken={setStateIsAuthenticated}/> : <Navigate to="/login"/>}/>
                <Route path="/quiz" element={isAuthenticated ? <Quiz/> : <Navigate to="/login"/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/create" element={isAuthenticated ? <QuestionForm/> : <Navigate to="/login"/>}/>
                <Route path="/list" element={isAuthenticated ? <List/> : <Navigate to="/login"/>}/>
                <Route path="/history" element={isAuthenticated ? <History/> : <Navigate to="/login"/>}/>
                <Route path="/login" element={<Login setToken={setStateIsAuthenticated}/>}/>
                <Route path="*" element={<NoMatch/>}/>
            </Routes>
        </HashRouter>
    )
}

function NoMatch() {
    return (
        <div className="quiz-container flex-column">
            <h1>Nothing to see here!</h1>
            <button className="quiz-container"><Link style={{"textDecoration": "none", color: "white"}} to="/react-github-pages/">Go to the home
                page</Link></button>
        </div>
    )
}

export default App;
