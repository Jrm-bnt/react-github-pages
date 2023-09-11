import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import toast, {Toaster} from "react-hot-toast";
import QuestionForm from "./questionForm";
import {CONSTANT} from "../constant/constant";

const List = () => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState([])

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

    useEffect(() => {
        fetch(`${CONSTANT.BASE_URL}questions`)
            .then(res => res.json())
            .then(
                (result) => {
                    setQuestions(result)
                    setLoading(false)
                })
    }, [])
const handleDelete = (id)=>{
    console.log('delete')
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        }
        fetch(`${CONSTANT.BASE_URL}questions/${id}`, requestOptions)
            .then(res => {
                if (res.status === 204) {
                    const updatedQuestions = questions.filter((question) => question.id !== id);
                    // Mettez à jour l'état avec la nouvelle liste de questions
                    setQuestions(updatedQuestions);
                } else {
                    console.error('La suppression a échoué.');
                }
            })
            .catch(error => {
                console.error('Erreur réseau :', error);
            })


}
    const renderListQuestion = () => {
        return (
            <div>
                <ul>
                    {questions.map((data) => (
                        <div style={{display:"flex"}}>
                        <li key={data.id} onClick={()=>renderEditQuestion(data)}>{data.quest} </li>
                            <button
                                onClick={()=>handleDelete(data.id)}
                                style={{
                                size : "1px",
                                color: "red",
                                fontSize: "larger",
                                marginTop:"25px",
                                marginLeft: "10px",
                                padding:"5px",
                                background: "none"
                            }}>X</button>
                        </div>

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
