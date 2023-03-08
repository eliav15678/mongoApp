import {BrowserRouter, Routes ,Route} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboared from './pages/Dashboared';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/Dashboared' element={<Dashboared />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
