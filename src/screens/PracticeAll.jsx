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
    return <Word word={word} index={index} setSentenceObj={setSentenceObj}/>
  })
  
  return (
    <>
      <div>
        <p>
        {sentenceObj.targetLanguageSentence}
        </p>
      </div>
      <div>

      </div>
      <div>
        {wordDisplay}
      </div>
    </>
  )
}

export default PracticeAll