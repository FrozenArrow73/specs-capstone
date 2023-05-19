import React from 'react'

function PublicBookCard(params) {
  return (
    <div className='bookCard'>
      <div>
        <img src={params.imgUrl} alt={params.title + " cover image"} />
      </div>
      {params.title}
      <button>Add</button>
    </div>
  )
}

export default PublicBookCard