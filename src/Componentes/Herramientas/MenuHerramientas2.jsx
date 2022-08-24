import React from 'react'
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import CalculaDescuento from './CalculaDescuento';
import MenuHerramientas from "./MenuHeramientas";
import MenuExcel from './MenuExcel';



var color = "false";
var color2 = "false";
var color3 = "false";
function  MenuHerramientas2() {
      /*========================== Mostrar/Ocultar =========================*/
  const [show, setShow] = useState(false);
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
      <h2>Herramientas</h2>
      </div> 

        <div  className='table size'>

    <Table >
      {/*========================== Titulos Tabla ==========================*/}
      <thead>
        <tr >
          <th  className='ocultar' > Calculadora</th>
          <th className='ocultar'> Plantila Excel</th>
          <th className='ocultar'> Documentación</th>
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
Calculadora
                {" "}
                {show ?<Icon icon="clarity:calculator-solid"  width={"20px"}  color={"gray"}  />: <Icon icon="clarity:calculator-solid" width={"20px"}   color={"green"}/>   }{" "}


 
              </button>
              {show ? (
                <div></div>
              ) : (
                <div className="personal">
                <CalculaDescuento  />
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

Documentación
                {" "}
                {show2 ? <Icon icon="bxs:file-doc" width={"20px"}  color={"gray"} /> : <Icon icon="bxs:file-doc" width={"20px"}  color={"green"} /> }{" "}
              </button>
              {show2 ? (
                <div></div>
              ) : (
                <div className="personal">
 
                  {/*========================== Llamado al Componente ==========================*/}
                       
              {/*     <Personal /> */}


                   <MenuHerramientas/>
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

         Plantilla Excel
                {" "}
                {show3 ? <Icon icon="file-icons:microsoft-excel"   width={"20px"}   color={"gray"}  /> :  <Icon icon="file-icons:microsoft-excel"  width={"20px"}   color={"green"} />           }{" "}
              </button>
              {show3 ? (
                <div></div>
              ) : (
                <div className="personal">
 
                  {/*========================== Llamado al Componente ==========================*/}
                       
             
   < MenuExcel />
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

export default MenuHerramientas2