import React from 'react'

function Word(props) {
    const handleClick = () => {
        
    }
  return (
    <p onClick={handleClick}>{props.word}</p>
  )
}

export default Word