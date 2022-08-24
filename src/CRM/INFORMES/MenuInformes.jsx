
import React from 'react'
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Table} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

var color = "false";
var color2 = "false";
var color3 = "false";
var color4 = "false";
var color5 = "false";



function   MenuInformes() {
      /*========================== Mostrar/Ocultar =========================*/
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(true);
  const [show3, setShow3] = useState(true);
  const [show4, setShow4] = useState(true);
  const [show5, setShow5] = useState(true);


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


  function checarColor2 (){
    if(show2  ===true){
        color2 ="true"
            }else{
                color2 ="false"
            }    
  }


  function checarColor3 (){
    if(show3 ===true){
        color3 ="true"
            }else{
                color3 ="false"
            }    
  }

  function checarColor4 (){
    if(show4  ===true){
        color4 ="true"
            }else{
                color4 ="false"
            }    
  }

  function checarColor5 (){
    if(show5  ===true){
        color5 ="true"
            }else{
                color5 ="false"
            }    
  }





  return (

    <div >

      <div  className='titulo'>
      <h2>Informes</h2>
      </div> 

        <div  className='table size'>

    <Table >
      {/*========================== Titulos Tabla ==========================*/}
      <thead>
        <tr >
          <th  className='ocultar' > Usuarios</th>
          <th className='ocultar'>Clientes</th>
          <th  className='ocultar' >Proveedores</th>

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
                  setShow4(true);    
                  setShow5(true);                    
                
                }}
              >
Grafica 1
                {" "}
                {show ?<Icon icon="foundation:graph-pie"  width={"20px"}  color={"gray"}  />: <Icon icon="foundation:graph-pie" width={"20px"}   color={"green"} />   }{" "}


 
              </button>
              {show ? (
                <div></div>
              ) : (
                <div className="personal">

        


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
                  setShow4(true);    
                  setShow5(true);                    
                
                }}
              >

Grafica 2
                {" "}
                {show2 ? <Icon icon="bi:graph-up-arrow" width={"20px"}  color={"gray"} /> : <Icon icon="bi:graph-up-arrow" width={"20px"} color={"green"}   /> }{" "}
              </button>
              {show2 ? (
                <div></div>
              ) : (
                <div className="personal ">
         
                  {/*========================== Llamado al Componente ==========================*/}


              
                </div>
              )}
            </td>



            
            <td  className={color3} onChange={checarColor3 ()}>
              <button
                className="icon"
                type="button"
                onClick={() => {
                  setShow3(!show3);
                  setShow(true);
                  setShow2(true); 
                  setShow4(true);    
                  setShow5(true);                    
                
                }}
              >

Grafica 3
                {" "}
                {show3 ? <Icon icon="bi:graph-down-arrow" width={"20px"}  color={"gray"} /> : <Icon icon="bi:graph-down-arrow" width={"20px"}  color={"green"}  /> }{" "}
              </button>
              {show3 ? (
                <div></div>
              ) : (
                <div className="personal">
             
                  {/*========================== Llamado al Componente ==========================*/}
                       

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

export default MenuInformes