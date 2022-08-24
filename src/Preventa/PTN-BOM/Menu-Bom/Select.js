import React from 'react'
import { useState } from 'react';
import Table from "react-bootstrap/Table";
import Animaciones from '../../../Componentes/Animaciones';
import Excel from '../../../Componentes/Herramientas/excel';
import DatosSp2 from './DatosSP2';
import DatosCategorias from './DatosCategorias';
import Partida from './Partida';
import swal from "sweetalert"



function Select(props) {



      /*========================== Mostrar Ocultar Tabla ==========================*/
  const [show, setShow] = useState(true);

    /*========================== Mostrar Ocultar Tabla ==========================*/
    const [show2, setShow2] = useState(true);




    const MostrarAlerta=()=>{

   

      if( show2 == true){ 
        swal({
          title: "Prorrateo",
          text: "Nota: Para Finalizar el Proyecto sin prorrateo No agregue productos ni servicios y dar click en el botón  <Terminar Proyecto>. ",
          icon: "warning",
          button: "Cerrar"
      
        })
      }
   
    }
  

  return (
  
    <div className="">


      <Animaciones mytext="Datos" />

      {/*========================== Tabla  Categorias ==========================*/}
      <Table >
        {/*========================== Titulos Tabla ==========================*/}
        <tbody>
          <tr className="">
            {/*========================== Divisa ==========================*/}
           


            <td>
                {/*=======================  Boton Empezar Nuevo proyecto ======================= */}
 {/*                <button className="btn btn-primary modificar" type="submit"> Agregar proyecto  </button> */}
      <button 
      className="btn btn-primary modificar" 
      type="submit" 
      onClick={() => { 
        setShow(!show);
        setShow2(true);

      }}>  
      {show ? 'Agregar Partidas' : 'Ocultar Datos'}    
      </button>
      {show ? (
        <div >

        </div>
      ) : 
      
      
      (
        <div className="arregla contenido">


      <Partida clave={props.clave}/>
      {/*     <DatosPTN clave={clavep} /> */}

      <DatosSp2   clave={props.clave}/>

        </div>
      )}
            
              </td>



              <td>
                {/*=======================  Boton Empezar Nuevo proyecto ======================= */}
 {/*                <button className="btn btn-primary modificar" type="submit"> Agregar proyecto  </button> */}
      <button 
      className="btn btn-primary modificar" 
      type="submit" 
      onClick={() => { 
        setShow2(!show2);
        setShow(true);
       MostrarAlerta()
     
      }}>  
      {show2 ? 'Agregar Categorias' : 'Ocultar Datos'}    
      </button>
      {show2 ? (
        <div >

        </div>
      ) : 
      
      
      (
        <div className="arregla contenido">
   
      <DatosCategorias    clave={props.clave} />

        </div>
      )}
            
              </td>


          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default Select