import React from 'react'

function Word(props) {
    const handleClick = () => {
        if(!props.getNextSentence){
            props.setSentenceObj((sentenceObj) => {
                sentenceObj.words.splice(props.index, 1)
                sentenceObj.answer.push(props.word)
                return {...sentenceObj}
            })
        }
    }
  return (
    <p onClick={handleClick} className='word'>{props.word}</p>
  )
}

export default Word