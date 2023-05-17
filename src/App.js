import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import Head from './components/Head';
import Foot from './components/Foot';
import Login from './screens/Login';
import PracticeAll from './screens/PracticeAll';
import PracticeMistake from './screens/PracticeMistake';
import PersonalLibrary from './screens/PersonalLibrary';
import PublicLibrary from './screens/PublicLibrary';
import AuthContext from './store/authContext';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';



function App() {
  const [isAuthorized, setIsAuthorized] = useState(true)
  const authContext = useContext(AuthContext)

  useEffect(()=>{
    axios.get("http://localhost:4000/authorization", {headers: {authorization: authContext.token}})
      .then((res)=> {
        setIsAuthorized(true)
    }).catch((err)=> {
      console.log(err)
        setIsAuthorized(false)
        authContext.logout()
    })
  },[authContext.token])

  


  return (
    <div className="App">
      <Head/>
      <div className='body'>
        <Routes>
          <Route path='/' element={isAuthorized? <PracticeAll/> : <Navigate to='/login'/>}/>
          <Route path="/mistake" element={isAuthorized? <PracticeMistake/> : <Navigate to='/login'/>}/>
          <Route path="/personal" element={isAuthorized? <PersonalLibrary/> : <Navigate to='/login'/>}/>
          <Route path="/public" element={isAuthorized? <PublicLibrary/> : <Navigate to='/login'/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/*" element={<Navigate to='/'/>}/>
        </Routes>
      </div>
      <Foot/>
    </div>
  );
}

export default App;
