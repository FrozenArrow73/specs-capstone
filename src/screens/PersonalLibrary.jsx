import React, {useEffect, useContext, useMemo} from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'
import PersonalBookCard from '../components/PersonalBookCard'

function PersonalLibrary({personalBooks, setPersonalBooks, setPublicBooks}) {
  const authContext = useContext(AuthContext)

  useEffect(() => {
    axios.get(`http://localhost:4000/api/getPersonalBooks/${authContext.userId}`, {headers: {authorization: authContext.token}}).then((res)=> {
      console.log(res.data)
      setPersonalBooks(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])
  const personalDisplay = useMemo(() => {
    return personalBooks.map((book) => {
      return <PersonalBookCard key={book.id} bookId={book.id} title={book.title} imgUrl={book.img_url} language={book.language} setPublicBooks={setPublicBooks} setPersonalBooks={setPersonalBooks}/>
    })
  }, [personalBooks])
  return (
    <div className='library'>{personalDisplay}</div>
  )
}

export default PersonalLibrary