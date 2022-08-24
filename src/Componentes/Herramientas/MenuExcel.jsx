
import React from 'react'
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import NuevoProyectoExcel from './NuevoProyectoExcel';
import ContinuarPCE from './ContinuarProyectoCE';



var color = "false";
var color2 = "false";

function  MenuExcel() {
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
Nuevo Proyecto
                {" "}
                {show ?<Icon icon="file-icons:microsoft-excel"  width={"20px"}  color={"gray"}  />: <Icon icon="vscode-icons:file-type-excel" width={"20px"}  />   }{" "}


 
              </button>
              {show ? (
                <div></div>
              ) : (
                <div className="personal anidado">
                <NuevoProyectoExcel  />
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

Continuar Proyecto
                {" "}
                {show2 ? <Icon icon="file-icons:microsoft-excel" width={"20px"}  color={"gray"} /> : <Icon icon="vscode-icons:file-type-excel" width={"20px"}   /> }{" "}
              </button>
              {show2 ? (
                <div></div>
              ) : (
                <div className="personal anidado">
 
                  {/*========================== Llamado al Componente ==========================*/}
                       
              {/*     <Personal /> */}


                   <ContinuarPCE/>
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

export default MenuExcel