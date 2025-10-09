
import main from '../Components_General/main'
import {Routes, Route} from 'react-router-dom'
import Indexprim from './Index';
import Home from './home';
import Tienda from './Tienda';
import Veterinarios from './Veterinarios';
function App() {
 return(
  <div>
    <Routes>
      <Route path='/'element={<Indexprim/>}/>
      <Route path='/home'element={<Home/>}/>
      <Route path='/tienda'element={<Tienda/>}/>
      <Route path='/veterinarios'element={<Veterinarios/>}/>
    </Routes>
  </div>
 );

}

export default App
