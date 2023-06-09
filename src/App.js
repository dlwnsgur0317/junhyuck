import './test.scss/test.css';
import { Main } from './pages/main';
import { Routes,Route } from 'react-router-dom';
import { Navbar } from './modules/navbar';
import { Training } from './pages/training';
import { Login } from './pages/login';
import { JoinMember } from './pages/joinMember';
import { Board } from './pages/board';
import { Test } from './pages/test';


function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/training/:id/:id' element={<Training/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/joinMember' element={<JoinMember/>}/>
        <Route path='/board' element={<Board/>}/>
        <Route path='/test' element={<Test/>}/>
      </Routes>
    </>
  );
}

export default App;
