import React from 'react'
import './menulateral.css'
import Cookies from "universal-cookie";

const cookies = new Cookies();




function DireccionMenu(props) {
  
  const cierreSesion = () => {
    cookies.remove("id_usuario", { path: "/" });
    cookies.remove("rol", { path: "/" });
    cookies.remove('estado_login', { path: "/" });
    window.location.href = "../Login.js";
};


  
  return (

    <div className="contenedor">


         
      {/*======================== Menú ==========================*/}
      <nav className="main-menu">
        <ul>
     {/*      <div className="administrador-user">
            <li>
              <i className="bi bi-person-circle fa-2x"></i>
              <span className="nav-text">Administrador</span>
            </li>
          </div> */}

          <li className='logo'>
            <a  href="/"  >
              <i className="bi"  ></i>
              <span className="nav-text logo">MARVILOP</span>
            </a>

          </li>


          
          <li className="has-subnav">
            <a href="/" >
              <i className="bi bi-house-fill"></i>
              <span className="nav-text">Inicio</span>
            </a>
          </li>


          <li className="has-subnav">
            <a href="/task" >
              <i className="bi bi-list-task"></i>
              <span className="nav-text">TAREAS</span>
            </a>
          </li>


          <li className="has-subnav">
            <a href="/administracion" >
              <i className="bi bi-list-task"></i>
              <span className="nav-text">ADMINISTRACIÓN</span>
            </a>
          </li>



          
          <li className="has-subnav">
            <a href="/oportunidades" >
              <i className="bi bi-list-task"></i>
              <span className="nav-text">OPORTUNIDADES</span>
            </a>
          </li>



          <li className="has-subnav">
            <a href="/informes" >
              <i className="bi bi-list-task"></i>
              <span className="nav-text">INFORMES</span>
            </a>
          </li>


          <li className="has-subnav">
            <a href="/calendario" >
              <i className="bi bi-list-task"></i>
              <span className="nav-text">CALENDARIO</span>
            </a>
          </li>




          <li className="has-subnav">
            <a href="/preventa"  >
              <i className="bi bi-wallet2"></i>
              <span className="nav-text">PROYECTOS</span>
            </a>
          </li>
          



   {/* 
          <li className="has-subnav">
            <a href="/registros" >
              <i className="bi bi-person-plus-fill"></i>
              <span className="nav-text">Registros</span>
            </a>
          </li>
          
 */}

  
      {/*   <li className="has-subnav">
            <a href="/administracion"  >
              <i className="bi bi-pencil-square"></i>
              <span className="nav-text">Administración</span>
            </a>
          </li> */}



        


  
        <li className="has-subnav">
            <a href="/venta" >
              <i className="bi bi-currency-dollar"></i>
              <span className="nav-text">ANÁLISIS PROYECTOS</span>
            </a>
          </li>


        


                    
      
{/*             <li className="has-subnav">
            <a href="#perfil" data-toggle="collapse"   >
              <i className="bi bi-question-diamond" />
              <span className="nav-text">Menú</span>
            </a>
            <ul className="collapse list-unstyled" id="perfil">
              <li>
                <a href="/">
                <i className="bi bi-question-diamond" />
              <span className="nav-text">Sub-menú</span>
                </a>
              </li>
            </ul>
          </li>

 */}



         <li className="has-subnav">
            <a href="/herramientas" >
              <i className="bi bi-tools"></i>
              <span className="nav-text">Herramientas</span>
            </a>
          </li>




          {/*======================== Salir ==========================*/}
        </ul>
     <ul className="logout">
          <li>
            <a href="#"   onClick={cierreSesion} >
              <i className="fa fa-power-off fa-2x"></i>
              <span className="nav-text">Salir</span>
            </a>
          </li>
        </ul> 
      </nav>

{/* <div className='data-consulta'>
<DatosConsulta/>
</div> */}


      {/* <div className={isActivePromocion ? "" : "promocion active"}>
      
      </div>


      <div className={isActiveHorarios ? "" : "horarios active"}>
   
      </div> */}

















    </div>
  )
}

export default DireccionMenu