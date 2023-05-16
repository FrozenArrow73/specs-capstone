import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import Head from './components/Head';
import Foot from './components/Foot';
import Login from './screens/Login';
import PracticeAll from './screens/PracticeAll';
import PracticeMistake from './screens/PracticeMistake';
import PersonalLibrary from './screens/PersonalLibrary';
import PublicLibrary from './screens/PublicLibrary';



function App() {
  return (
    <div className="App">
      <Head/>
      <div className='body'>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path="/all" element={<PracticeAll/>}/>
          <Route path="/mistake" element={<PracticeMistake/>}/>
          <Route path="/personal" element={<PersonalLibrary/>}/>
          <Route path="/public" element={<PublicLibrary/>}/>
        </Routes>
      </div>
      <Foot/>
    </div>
  );
}

export default App;
