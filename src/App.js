import './test.scss/test.css';
import { Main } from './pages/main';
import { Routes,Route } from 'react-router-dom';
import { Navbar } from './modules/navbar';
import { Training } from './pages/training';


function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/training/:id' element={<Training/>}/>
      </Routes>
    </>
  );
}

export default App;
