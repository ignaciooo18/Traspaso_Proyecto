
import main from '../Components_General/main'
import {Routes, Route} from 'react-router-dom'
import Indexprim from './Index';
import Home from './home';
import Tienda from './Tienda';
import Veterinarios from './Veterinarios';
import CerrarSesion from './CerrarSesion';
import PaginaResenas from './Explorar';
import HistorialCitas from './Historial';
import PerfilUsuario from './PerfilUsuario'
import Registro from './Registro'
import Login from './InicioSesion'
function App() {
 return(
  <div>
    <Routes>
      <Route path='/'element={<Indexprim/>}/>
      <Route path='/home'element={<Home/>}/>
      <Route path='/tienda'element={<Tienda/>}/>
      <Route path='/veterinarios'element={<Veterinarios/>}/>
      <Route path='/cerrar'element={<CerrarSesion/>}/>
      <Route path='/explorar'element={<PaginaResenas/>}/>
      <Route path='/Historial'element={<HistorialCitas/>}/>
      <Route path='/perfil' element={<PerfilUsuario/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Registro/>}/>
    </Routes>
  </div>
 );

}

export default App
