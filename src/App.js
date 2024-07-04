import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Todo from './components/Todo';
import Test from './components/Test';

function App() {
  return (

    <div>

    {/* <div className='React'>
      <h1>todo App</h1>
      <p> this is todo <span style={{color: 'red'}}>app</span></p>
    </div> */}

    <Router>
      <Routes>
        <Route path='/todo' element={<Todo />} />
        <Route path='/' element={<Todo />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </Router>

    </div>
  );
}

export default App;
