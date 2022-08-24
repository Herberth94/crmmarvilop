import React from 'react'
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Table} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Divisa from './AM/Menu-AM/Divisa';
import ResumenAM from './AM/Menu-AM/ResumenAM';



import BuscadorInteligente2 from './AM/Menu-AM/BuscadorInteligente2';
import BuscadorProyectoFinanciamiento from './Proporcionalidad/MenuProporcionalidad/BuscadorProyectoFinanciamiento';


var color = "false";
var color2 = "false";
var color3 = "false";
function  MenuProporcionalidad() {
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
Resumen 
                {" "}
                {show ?<Icon icon="bi:cash-coin"  width={"20px"}  color={"gray"}  />: <Icon icon="bi:cash-coin" width={"20px"}   color={"green"}/>   }{" "}


 
              </button>
              {show ? (
                <div></div>
              ) : (
                <div className="personal anidado">

                    <BuscadorInteligente2 />
           
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
Registrar Financiamiento
                {" "}
                {show2 ? <Icon icon="akar-icons:money" width={"20px"}  color={"gray"} /> : <Icon icon="akar-icons:money" width={"20px"}  color={"green"} /> }{" "}
              </button>
              {show2 ? (
                <div></div>
              ) : (
                <div className="personal   anidado">

                    <BuscadorProyectoFinanciamiento/>
 
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

export default MenuProporcionalidad