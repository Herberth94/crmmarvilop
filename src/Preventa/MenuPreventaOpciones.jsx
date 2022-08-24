import React from 'react'
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Table} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import NuevoProyecto from './PTN-BOM/Menu-Bom/NuevoProyecto';
import MenuContinuar from './PTN-BOM/MenuContinuar';
import MenuResumen from './PTN-BOM/MenuResumen';


var color = "false";
var color2 = "false";
var color3 = "false";
function  MenuPreventaOpciones() {
      /*========================== Mostrar/Ocultar =========================*/
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(true);
  const [show3, setShow3] = useState(true);


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



  function checarColor3 (){
    if(show3  ===true){
        color3 ="true"
            }else{
                color3 ="false"
            }    
  }


  return (

    <div id="contenido">

      <div  className='titulo'>
      <h2>Proyectos</h2>
      </div> 

        <div  className='table size'>

    <Table >
      {/*========================== Titulos Tabla ==========================*/}
      <thead>
        <tr >
          <th  className='ocultar' >Nuevo Proyecto</th>
          <th className='ocultar'> Continuar</th>
          <th className='ocultar'> Resumen</th>
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
                  setShow3(true);
                }}
              >
Nuevo Proyecto
                {" "}
                {show ?<Icon icon="eos-icons:content-new"  width={"20px"}  color={"gray"}  />: <Icon icon="eos-icons:content-new" width={"20px"}   color={"green"}/>   }{" "}


 
              </button>
              {show ? (
                <div></div>
              ) : (
                <div className="personal">
              <NuevoProyecto />
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
                  setShow3(true);
                }}
              >

Continuar Proyecto
                {" "}
                {show2 ? <Icon icon="carbon:continue" width={"20px"}  color={"gray"} /> : <Icon icon="carbon:continue" width={"20px"}  color={"green"} /> }{" "}
              </button>
              {show2 ? (
                <div></div>
              ) : (
                <div className="personal">
 

 <MenuContinuar />
                  {/*========================== Llamado al Componente ==========================*/}
                       
              {/*     <Personal /> */}


           
                </div>
              )}
            </td>

    
            <td  className={color3} onChange={checarColor3 ()}>
              <button
                className="icon"
                type="button"
                onClick={() => {
                  setShow3(!show3);
                  setShow2(true);
                  setShow(true);
                }}
              >

    Resumen 
                {" "}
                {show3 ? <Icon icon="carbon:task-view"   width={"20px"}   color={"gray"}  /> :  <Icon icon="carbon:task-view"  width={"20px"}   color={"green"} />           }{" "}
              </button>
              {show3 ? (
                <div></div>
              ) : (
                <div className="personal">

                    < MenuResumen />
 
                  {/*========================== Llamado al Componente ==========================*/}
                       

             {/*      <Personal />

 */}
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

export default MenuPreventaOpciones