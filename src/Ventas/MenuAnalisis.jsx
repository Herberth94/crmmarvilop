import React from 'react'
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Table} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Divisa from './AM/Menu-AM/Divisa';
import ResumenAM from './AM/Menu-AM/ResumenAM';
import BuscadorInteligente from './AM/Menu-AM/BuscadorInteligente';


var color = "false";
var color2 = "false";
var color3 = "false";
function  MenuOpcionesVenta() {
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
          <th className='ocultar'> Propuesta</th>
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
Divisa
                {" "}
                {show ?<Icon icon="bi:cash-coin"  width={"20px"}  color={"gray"}  />: <Icon icon="bi:cash-coin" width={"20px"}   color={"green"}/>   }{" "}


 
              </button>
              {show ? (
                <div></div>
              ) : (
                <div className="personal anidado">

                    <Divisa/>
           
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
Resumen AM
                {" "}
                {show2 ? <Icon icon="zondicons:calculator" width={"20px"}  color={"gray"} /> : <Icon icon="zondicons:calculator" width={"20px"}  color={"green"} /> }{" "}
              </button>
              {show2 ? (
                <div></div>
              ) : (
                <div className="personal   anidado">

                    <ResumenAM/>
 
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

     Costos Indirectos
                {" "}
                {show3 ? <Icon icon="fluent:book-coins-20-filled"   width={"20px"}   color={"gray"}  /> :  <Icon icon="fluent:book-coins-20-filled"  width={"20px"}   color={"green"} />           }{" "}
              </button>
              {show3 ? (
                <div></div>
              ) : (
                <div className="personal anidado">
 

 <BuscadorInteligente/>
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

export default MenuOpcionesVenta