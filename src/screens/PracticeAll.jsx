import React, {useEffect, useContext, useState} from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'
import Word from '../components/Word'
import Answer from '../components/Answer'

function PracticeAll() {
  const authContext = useContext(AuthContext)
  const [sentenceObj, setSentenceObj] = useState({
    targetLanguageSentence: "",
        englishSentence: [],
        sentenceId: null,
        answer: [],
        words: []
  })
  const [outcomeDisplay, setOutcomeDisplay] = useState("")
  const [getNextSentence, setGetNextSentence] = useState(false)

  const loadSentence = () => {
    axios.get(`http://localhost:4000/api/getRandomSentence/${authContext.userId}`, {headers: {authorization: authContext.token}}).then((res)=>{
      setSentenceObj({
        targetLanguageSentence: res.data.targetLanguageSentence,
        englishSentence: res.data.englishSentence.split(" "),
        sentenceId: res.data.sentenceId,
        answer: [],
        words: res.data.englishSentence.split(" ").sort(()=> 0.5 - Math.random())
      })
      
    }).catch((err)=> {
      console.log(err)
    })
  }

  useEffect(()=>{
    loadSentence()
  }, [])
  const wordDisplay = sentenceObj.words.map((word, index) => {
    return <Word key={index} word={word} index={index} setSentenceObj={setSentenceObj} getNextSentence={getNextSentence}/>
  })
  const answerDisplay = sentenceObj.answer.map((answer, index) => {
    return <Answer key={index} answer={answer} index={index} setSentenceObj={setSentenceObj} getNextSentence={getNextSentence}/>
  })

  const handleClick = (event) => {
    if(getNextSentence) {
      setOutcomeDisplay("")
      setSentenceObj({
        targetLanguageSentence: "",
        englishSentence: [],
        sentenceId: null,
        answer: [],
        words: []
      })
      loadSentence()
      setGetNextSentence(false)
    } else {
      let perfectMatch = true
      setGetNextSentence(true)
      if (sentenceObj.englishSentence.length === sentenceObj.answer.length) {
        sentenceObj.englishSentence.forEach((word, index) =>{
          if (word !== sentenceObj.answer[index]) {
            perfectMatch = false
          }
        })
      } else {
        perfectMatch = false
      }
      if(perfectMatch) {
        setOutcomeDisplay(<p>Correct</p>)
        axios.put("http://localhost:4000/api/updateSentence", {pass: true, sentenceId: sentenceObj.sentenceId, userId: authContext.userId}, {headers: {authorization: authContext.token}}).then((res) => {
          console.log("sentenceGrade Updated")
        }).catch((err)=> {
          console.log(err)
          console.log("unable to update SentenceGrade")
        })
      } else {
        setOutcomeDisplay(
          <>
          <p>Incorrect</p>
          <div className='wordCardBlue'>
            <p>{sentenceObj.englishSentence.join(" ")}</p>
          </div>
          </>
        )
        axios.put("http://localhost:4000/api/updateSentence", {pass: false, sentenceId: sentenceObj.sentenceId, userId: authContext.userId}, {headers: {authorization: authContext.token}}).then((res) => {
          console.log("sentenceGrade Updated")
        }).catch((err)=> {
          console.log(err)
          console.log("unable to update SentenceGrade")
        })
      }
    }
  }
  const sentenceUnavalableDisplay = <p>No sentences to practice</p>
  return (
    <div className='practice'>
      {!sentenceObj.targetLanguageSentence && sentenceUnavalableDisplay}
      {outcomeDisplay}
      <div className='wordCard'>
        <p>
        {sentenceObj.targetLanguageSentence}
        </p>
      </div>
      <div className='wordCard'>
        <p></p>
        {answerDisplay}
      </div>
      <div className='wordCard'>
        <p></p>
        {wordDisplay}
      </div>
      <div>
        <button onClick={handleClick}>{getNextSentence? "Next" : "Submit"}</button>
      </div>
    </div>
  )
}

export default PracticeAll