import React, {useContext} from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'

function PublicBookCard(params) {
  const authContext= useContext(AuthContext)
  const handleClick = () => {
    axios.post(`http://localhost:4000/api/addPersonalBook/${params.bookId}/${authContext.userId}`).then((res) => {
      params.setPublicBooks((publicBooks)=> {
        return publicBooks.filter((book) => {
          return book.id !== params.bookId
        })
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className='bookCard'>
      <div>
        <img src={params.imgUrl} alt={params.title + " cover image"} />
      </div>
      {params.title}
      <button onClick={handleClick}>Add</button>
    </div>
  )
}

export default PublicBookCard