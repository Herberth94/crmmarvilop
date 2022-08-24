import React from 'react'
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Table} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import BuscadorInteligente3 from '../Administrador/PropuestaEconomica/Menu-Propuesta/BuscadorInteligente3';
import BuscadorInteligente4 from '../Administrador/PropuestaEconomica/Menu-Propuesta/BuscadorInteligente4';

var color = "false";
var color2 = "false";
var color3 = "false";
function  MenuPropuesta() {
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
      <h2></h2>
      </div> 

        <div  className='table size'>

    <Table >
      {/*========================== Titulos Tabla ==========================*/}
      <thead>
        <tr >
          <th  className='ocultar' > Analisis de Margen</th>
          <th className='ocultar'> Proporcionalidad</th>

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
Administrar
                {" "}
                {show ?<Icon icon="el:file-edit"  width={"20px"}  color={"gray"}  />: <Icon icon="el:file-edit" width={"20px"}   color={"green"}/>   }{" "}


 
              </button>
              {show ? (
                <div></div>
              ) : (
                <div className="personal anidado">

<BuscadorInteligente4/>
           
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
Imprimir
                {" "}
                {show2 ? <Icon icon="fluent:print-24-filled" width={"20px"}  color={"gray"} /> : <Icon icon="fluent:print-24-filled" width={"20px"}  color={"green"} /> }{" "}
              </button>
              {show2 ? (
                <div></div>
              ) : (
                <div className="personal   anidado">

                    <BuscadorInteligente3/>

     
                  {/*========================== Llamado al Componente ==========================*/}
                       
              {/*     <Personal /> */}


              
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

export default MenuPropuesta