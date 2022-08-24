
import React from 'react'
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Table} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import "./admin.css"
import RegistrarUsuarios from '../../Administrador/Usuarios/MenuUsuarios/RegistrarUsuarios';
import AdministrarUsuarios from '../../Administrador/Usuarios/MenuUsuarios/AdministrarUsuarios';
import TipoCambio from './TipoCambio';


var color = "false";
var color2 = "false";
var color3 = "false";


function  MenuAdministracion() {
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







  return (

    <div >

      <div  className='titulo'>
      <h2>ADMINISTRACIÓN</h2>
      </div> 

        <div  className='table size'>

    <Table >
      {/*========================== Titulos Tabla ==========================*/}
      <thead>
        <tr >
          <th  className='ocultar' > Usuarios</th>
          <th className='ocultar'>Clientes</th>
          <th  className='ocultar' >Proveedores</th>
          <th className='ocultar'>Marcas</th>
          <th  className='ocultar' >Colaboradores</th>
   
        
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
Registros
                {" "}
                {show ?<Icon icon="gis:globe-users"  width={"20px"}  color={"gray"}  />: <Icon icon="gis:globe-users" width={"20px"}   color={"green"} />   }{" "}


 
              </button>
              {show ? (
                <div></div>
              ) : (
                <div className="personal">

                  <RegistrarUsuarios />

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

Permisos
                {" "}
                {show2 ? <Icon icon="raphael:users" width={"20px"}  color={"gray"} /> : <Icon icon="raphael:users" width={"20px"} color={"green"}   /> }{" "}
              </button>
              {show2 ? (
                <div></div>
              ) : (
                <div className="personal ">
         
                  {/*========================== Llamado al Componente ==========================*/}
                    <AdministrarUsuarios />  
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
                                   
                
                }}
              >

Tipo de Cambio
                {" "}
                {show3 ? <Icon icon="fluent:contact-card-16-filled" width={"20px"}  color={"gray"} /> : <Icon icon="fluent:contact-card-16-filled" width={"20px"}  color={"green"}  /> }{" "}
              </button>
              {show3 ? (
                <div></div>
              ) : (
                <div className="personal">
             
                  {/*========================== Llamado al Componente ==========================*/}
                  <TipoCambio />     

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

export default MenuAdministracion