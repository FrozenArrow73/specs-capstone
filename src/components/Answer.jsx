import React from 'react'

function Answer(props) {
    const handleClick = () => {
        if(!props.getNextSentence){
            props.setSentenceObj((sentenceObj) => {
                sentenceObj.answer.splice(props.index, 1)
                sentenceObj.words.push(props.answer)
                return {...sentenceObj}
            })
        }
    }
  return (
    <p onClick={handleClick}>{props.answer}</p>
  )
}

export default Answer