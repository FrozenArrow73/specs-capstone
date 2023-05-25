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

  useEffect(()=>{
    axios.get(`http://localhost:4000/api/getRandomSentence/${authContext.userId}`, {headers: {authorization: authContext.token}}).then((res)=>{
      console.log(res.data)
      setSentenceObj({
        targetLanguageSentence: res.data.targetLanguageSentence,
        englishSentence: res.data.englishSentence.split(" "),
        sentenceId: res.data.sentenceId,
        answer: [],
        words: res.data.englishSentence.split(" ")
      })
      
    })
  }, [])
  const wordDisplay = sentenceObj.words.map((word, index) => {
    return <Word key={index} word={word} index={index} setSentenceObj={setSentenceObj}/>
  })
  const answerDisplay = sentenceObj.answer.map((answer, index) => {
    return <Answer key={index} answer={answer} index={index} setSentenceObj={setSentenceObj}/>
  })

  const handleClick = (event) => {
    let perfectMatch = true
    console.log(sentenceObj.answer)
    console.log(sentenceObj.englishSentence)
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
      setOutcomeDisplay(<p>Correct</p>  )
    } else {
      setOutcomeDisplay(
        <>
        <p>Incorrect</p>
        <div className='wordCardBlue'>
          <p>{sentenceObj.englishSentence.join(" ")}</p>
        </div>
        </>
      )
    }
    console.log(outcomeDisplay)
  }
  
  return (
    <div className='practiceAll'>
      {outcomeDisplay}
      <div className='wordCard'>
        <p>
        {sentenceObj.targetLanguageSentence}
        </p>
      </div>
      <div className='wordCard'>
        {answerDisplay}
      </div>
      <div className='wordCard'>
        {wordDisplay}
      </div>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
    </div>
  )
}

export default PracticeAll