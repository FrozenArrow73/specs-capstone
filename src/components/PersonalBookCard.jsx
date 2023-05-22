import React, {useContext} from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'

function PersonalBookCard(params) {
    const authContext = useContext(AuthContext)


    const handleClick = () => {
        axios.delete(`http://localhost:4000/api/deletePersonalBook/${params.bookId}/${authContext.userId}`, {headers: {authorization: authContext.token}}).then((res) => {

            params.setPersonalBooks((personalBooks)=> {
                return personalBooks.filter((book)=> {
                    return book.id !== params.bookId
                })
            })
        }).catch((err)=> {
            console.log(err)
        })
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