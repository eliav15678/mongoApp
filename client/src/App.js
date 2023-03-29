import {BrowserRouter, Routes ,Route} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboared from './pages/Dashboared';


//import component
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
    <div className='container'>
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Dashboared' element={<Dashboared />} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
