import './App.css';
import Head from './components/Head';
import Foot from './components/Foot';
import Login from './screens/Login';


function App() {
  return (
    <div className="App">
      <Head/>
      <div className='body'>
        <Login/>
      </div>
      <Foot/>
    </div>
  );
}

export default App;
