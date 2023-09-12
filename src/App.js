import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

import Home from "./components/Home"
import Quiz from "./components/Quiz"
import History from "./components/History";
import QuestionForm from "./components/questionForm"
import List from "./components/List";
import Login from "./components/login";
import Register from "./components/register";

function App() {
    const isAuthenticated = !!localStorage.getItem('token'); // Vérifiez si l'utilisateur est connecté

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/react-github-pages" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                <Route path="/quiz" element={isAuthenticated ? <Quiz /> : <Navigate to="/login" />} />
                <Route path="/register" element={ <Register /> } />
                <Route path="/create" element={isAuthenticated ? <QuestionForm /> : <Navigate to="/login" />} />
                <Route path="/list" element={isAuthenticated ? <List /> : <Navigate to="/login" />} />
                <Route path="/history" element={isAuthenticated ? <History /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </BrowserRouter>
    )
}

function NoMatch() {
    console.log(window.location.href);
    return (
        <div className="quiz-container flex-column">
            <h1>Nothing to see here!</h1>
            <button className="quiz-container"><Link style={{"textDecoration": "none", color:"white"}} to="/react-github-pages/">Go to the home page</Link></button>
        </div>
    )
}

export default App;
