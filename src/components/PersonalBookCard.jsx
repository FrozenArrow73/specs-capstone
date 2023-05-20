import React from 'react'


function PersonalBookCard(params) {
    const handleClick = () => {

    }
  return (
    <div className='bookCard'>
      <div>
        <img src={params.imgUrl} alt={params.title + " cover image"} />
      </div>
      {params.title}
      <button onClick={handleClick}>Remove</button>
    </div>
  )
}

export default PersonalBookCard