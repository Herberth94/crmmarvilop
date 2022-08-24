
import React from 'react'
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Table } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import ContinuarProyecto from './Menu-Bom/ContinuarProyecto';


var color = "false";
var color2 = "false";

function  MenuContinuar(props) {
      /*========================== Mostrar/Ocultar =========================*/
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(true);

  function checarColor (){
    if(show  ===true){
        color ="true"
            }else{
                color ="false"
            }    


            

            
  }


  function checarColor2 (){
    if(show2  ===true){
        color2 ="true"
            }else{
                color2 ="false"
            }    
  }




  return (

    <div >

      <div  className='titulo'>
      <h2></h2>
      </div> 

        <div  className='table size'>

    <Table >
      {/*========================== Titulos Tabla ==========================*/}
      <thead>
        <tr >
          <th  className='ocultar' > Nuevo Proyecto</th>
          <th className='ocultar'>Continuar Proyecto</th>
        
        </tr>
      </thead>
      <tbody>
        <tr >

        <td className={color} onChange={checarColor ()}>
              <button
                className="icon"
                type="button"
                onClick={() => {
                  setShow(!show);
                  setShow2(true);                 
                
                }}
              >
Mis Proyectos
                {" "}
                {show ?<Icon icon="bi:person-lines-fill"  width={"20px"}  color={"gray"}  />: <Icon icon="bi:person-lines-fill" width={"20px"}  color={"green"}  />   }{" "}


 
              </button>
              {show ? (
                <div></div>
              ) : (
                <div className="personal anidado">
          
         <ContinuarProyecto 
            continue= "mis-proyectos" />
         
         
      
                </div>
              )}
            </td>



            <td  className={color2} onChange={checarColor2 ()}>
              <button
                className="icon"
                type="button"
                onClick={() => {
                  setShow2(!show2);
                  setShow(true);
                }}
              >

Proyectos Compartidos
                {" "}
                {show2 ?<Icon icon="fluent:people-team-24-filled"  width={"20px"}  color={"gray"}  />: <Icon icon="fluent:people-team-24-filled" width={"20px"}  color={"green"}   />   }{" "}
              </button>
              {show2 ? (
                <div></div>
              ) : (
                <div className="personal  anidado">
 
                  {/*========================== Llamado al Componente ==========================*/}


              <ContinuarProyecto   
              continue= "compartidos" />
                </div>
              )}
            </td>

    
        </tr>
      </tbody>
    </Table>


    </div>
  </div>
  )
}

export default MenuContinuar