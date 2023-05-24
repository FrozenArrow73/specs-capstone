import React from 'react'

function Word(props) {
    const handleClick = () => {
        props.setSentenceObj((sentenceObj) => {
            sentenceObj.words.splice(props.index, 1)
            sentenceObj.answer.push(props.word)
            return {...sentenceObj}
        })
    }
  return (
    <p onClick={handleClick}>{props.word}</p>
  )
}

export default Word