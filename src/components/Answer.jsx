import React from 'react'

function Answer(props) {
    const handleClick = () => {
        
    }
  return (
    <p onClick={handleClick}>{props.answer}</p>
  )
}

export default Answer