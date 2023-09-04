import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import toast, {Toaster} from "react-hot-toast";
import QuestionForm from "./questionForm";

const List = () => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState([
        {
            "id": 1,
            "question": "Quel mot clé est utilisé pour déclarer une variable en JavaScript ?",
            "options": ["var", "let", "const", 'state'],
            "correctAnswer": 1
        },
        {
            "id": 2,
            "question": "Quelle est la méthode utilisée pour ajouter un élément à la fin d'un tableau en JavaScript ?",
            "options": ["push()", "append()", "concat()", "add"],
            "correctAnswer": 0
        },
        {
            "id": 3,
            "question": "Quelle est la fonction utilisée pour afficher du texte dans la console en JavaScript ?",
            "options": ["log()", "print()", "display()", "console.log"],
            "correctAnswer": 0
        },
        {
            "id": 4,
            "question": "Quel opérateur est utilisé pour concaténer des chaînes de caractères en JavaScript ?",
            "options": ["+", "&", "*", "."],
            "correctAnswer": 0
        }])

    const renderEditQuestion = (data) => {
        setSelectedQuestion(data)
               return <QuestionForm data={data}/>
    }

    useEffect(() => {
        if (!loading) toast.remove()
        else {
            toast.remove()
            toast.loading('Loading...')
        }
    }, [loading])

    const renderListQuestion = () => {
        return (
            <div>
                <ul>
                    {questions.map((data) => (
                        <li key={data.id} onClick={()=>renderEditQuestion(data)}>{data.question} </li>
                    ))}
                </ul>
            </div>
        )
    }
 const renderList = ()=> {
        if (!selectedQuestion) {
            return (
                <div className="quiz-container flex-column" style={{textAlign: "center", minWidth: "700px"}}>
                    {renderListQuestion()}
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <button><Link style={{"textDecoration": "none", color: "white"}} to="/react-github-pages">Home</Link></button>
                        <button><Link style={{"textDecoration": "none", color: "white"}} to="/create">Add question</Link></button>
                    </div>
                </div>
            )
        }
        else return <QuestionForm
            data={selectedQuestion}
            setSelectedQuestion={setSelectedQuestion}
        />
 }

    return (
        <>
            {
                loading ? <Toaster/> : renderList()
            }
        </>
    )
}
export default List
