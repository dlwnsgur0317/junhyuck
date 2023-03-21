import './test.scss/test.css';
import { Main } from './pages/main';
import { Routes,Route } from 'react-router-dom';
import { Navbar } from './modules/navbar';
import { Training } from './pages/training';
import { Login } from './pages/login';
import { useParams } from 'react-router-dom';


function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/training/:id/:id' element={<Training/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;
