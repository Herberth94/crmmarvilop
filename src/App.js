import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import "./Componentes/css/Animaciones.css";
import "./css/Tablas.css";
import "./css/Buscador.css"

import DireccionMenu from "./Administrador/DireccionMenu";
import MenuHeramientas from "./Componentes/Herramientas/MenuHerramientas2";

import MenuPreventaOpciones from "./Preventa/MenuPreventaOpciones";

import Header from "./Componentes/Header";
//============ Rutas Públicas ============
import Login from './Administrador/Login/Login';
import Footer from './Componentes/Footer';
//============ Rutas Private Públicas ============
import PublicRoutes from "./Routes/PublicRoutes";
import MenuAdministrador from "./Preventa/MenuAdministrador";
import Direccion from "./Routes/ValidaDireccion";

//============ Rutas Private Públicas ============
//============ Rutas Private Administrador ============
import Administrador from "./Routes/ValidaAdministrador";

import CalculaDescuento from "./Componentes/Herramientas/CalculaDescuento";
import NuevoProyecto from "./Preventa/PTN-BOM/Menu-Bom/NuevoProyecto";
import NuevoProyectoExcel from "./Componentes/Herramientas/NuevoProyectoExcel";
import Excel from "./Componentes/Herramientas/excel";

//============ Administrador Páginas Private Administrador ============
import MenuDireccion from "./Administrador/MenuDireccion";
import MenuUsuarios from './Administrador/Usuarios/MenuUsuarios/MenuUsuarios';
import RegistrarUsuarios from "./Administrador/Usuarios/MenuUsuarios/RegistrarUsuarios"
import RegistrarClientes from "./Administrador/Clientes/MenuClientes/RegistrarClientes"
import RegistrarProveedor from "./Administrador/Proveedores/MenuProveedor/RegistrarProveedor";
import RegistrarMarcas from "./Administrador/Proveedores/MenuProveedor/RegistrarMarcas";


import AdministrarUsuarios from "./Administrador/Usuarios/MenuUsuarios/AdministrarUsuarios";
import AdministrarClientes from "./Administrador/Clientes/MenuClientes/AdministrarClientes";
import AdministrarProveedor from "./Administrador/Proveedores/MenuProveedor/AdministrarProveedor";
import AdministrarColaboradores from "./Preventa/Colaboradores/MenuColaborador/AdministrarColaboradores";
import AdministrarColaboradoresVenta from "./Preventa/Colaboradores/MenuColaborador/AdministrarColaboradoresVenta";
import AsignarProyecto from "./Preventa/AsignarVentas/MenuAsignacion/AsignarProyecto";


import CambioContraseña from "./Componentes/CambioContraseña";



import MenuRegistros from "./Administrador/MenuRegistros";
import MenuContinuar from "./Preventa/PTN-BOM/MenuContinuar";
import MenuOpcionesVenta from "./Ventas/MenuopcionesVenta";
import Tareas from "./CRM/TASK/Tareas";
import MenuTask from "./CRM/TASK/MenuTask";

import MenuAdministracion from "./CRM/ADMINISTRACION/MenuAdministracion";
import Oportunidades from "./CRM/OPORTUNIDADES/Oportunidades";
import MenuInformes from "./CRM/INFORMES/MenuInformes";
import Calendario from "./CRM/CALENDARIO/Calendario";


import Precios from "./CRM/INICIO/Precios";
import Caracteristicas from "./CRM/INICIO/Caracteristicas";
import Productos from "./CRM/INICIO/Productos";
import HeaderInicio from "./CRM/INICIO/HeaderInicio";



function App() {
  

  return (
    <div className="App">

      <Router>

        {/*========================== Páginas Públicas==========================*/}
  
     {/*    <PublicRoutes path="/" component={Footer} /> 
 */}

{/*         <PublicRoutes path="/" component={Header} /> */}
        <PublicRoutes  path="/" component={HeaderInicio} />
        <PublicRoutes  exact path="/" component={Productos} />
        <PublicRoutes  exact path="/precios" component={Precios} />
        <PublicRoutes  exact path="/login" component={Login} />

    

              {/* ======================================================  */}                  
                                        {/*Administrador*/}
              {/* ======================================================  */} 
        <Direccion path="/" component={Header}  /> 
        <Direccion path="/" component={DireccionMenu}  /> 
        <Direccion exact path ="/" component={CambioContraseña} />  
        <Direccion path="/herramientas" component={MenuHeramientas}  /> 
        <Direccion exact path="/registros" component={MenuRegistros} />
        <Direccion exact path="/administracion" component={MenuAdministracion} />



        <Direccion exact path="/administrar-asignaciones" component={AdministrarColaboradoresVenta}   />
        <Direccion exact path="/asignar-proyectos" component={AsignarProyecto} />

        <Direccion exact path="/preventa" component={MenuPreventaOpciones} />




        
        <Direccion exact path="/task" component={MenuTask} />
        <Direccion exact path="/oportunidades" component={Oportunidades} />
        <Direccion exact path="/informes" component={MenuInformes} />
        <Direccion exact path="/calendario" component={Calendario} />

    

    

    

    

    







      </Router>


    </div>
  );
}

export default App;
