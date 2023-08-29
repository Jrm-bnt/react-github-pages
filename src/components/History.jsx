import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {CONSTANT} from "../constant/constant";
import toast, {Toaster} from "react-hot-toast";

const History = () => {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${CONSTANT.BASE_URL}game`)
      .then(res => res.json())
      .then(result => {
        if (result.Count) {
          const sortedGames = result.Items.sort(compareByTimestamp)
          setGames(sortedGames)
        } else {
          setGames([])
        }
        setLoading(false)
      })
    const compareByTimestamp = (a, b) => {
      return b.id - a.id;
    }
  }, [])

  useEffect(() => {
    if (!loading) toast.remove()
    else {
      toast.remove()
      toast.loading('Loading...')
    }
  }, [loading])


  const renderObjectTable = () => {
    if (games.length) {
      return (
        <table>
          <thead style={{color: "rgb(123,103,235)"}}>
          <tr>
            <th>Score</th>
            <th>Date</th>
            <th>Correct Answers</th>
            <th>Wrong Answers</th>
            <th>Email</th>
          </tr>
          </thead>
          <tbody>
          {
            games?.map(game => (
              <tr key={game.id}>
                <td>{game.score}</td>
                <td>{new Date(game.date).toLocaleString()}</td>
                <td>{game.correctAnswer}</td>
                <td>{game.wrongAnswers}</td>
                <td>{game.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    } else return (
      <div style={{color: "rgb(123,103,235)", fontSize: ' 26px'}}> No history </div>
    )
  }

  return (
    <>
      {loading ? <Toaster/> :
    <div className="quiz-container flex-column" style={{textAlign: "center", minWidth: "700px"}}>
      {renderObjectTable()}
      <div style={{display: "flex", justifyContent: "center"}}>
        <button><Link style={{"textDecoration": "none", color: "white"}} to="/">Home</Link></button>
      </div>
    </div>
    }
    </>
  )
}
export default History
