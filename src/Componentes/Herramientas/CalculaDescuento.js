import React, { useEffect, useState } from "react";
import { precioUnitario, calcularDescuento, Total} from "../../Preventa/PTN-BOM/Operaciones/Operaciones";

import Animaciones from "../Animaciones";

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';


let validaOperacion = false;
function CalculaDescuento() {

function checa(){

validaOperacion = !validaOperacion;

}


    const [datos, setDatos] = useState({
        precio_lista:'',
        precio_unitario:'',
        precio_descuento: '',
        sp_cantidad:'',
        precio_total:'',
        precio_id_moneda:''
      });
      
      const handleInputChange = (event) => {
        setDatos({
          ...datos,[event.target.name]: event.target.value,
        });
      };
  
      

///CALCULAR DESCUENTO
      /*================================================================================*/
      useEffect(()=>{

        if(datos.precio_lista !=='' && datos.precio_unitario !==''  && validaOperacion === false){
          const desc = calcularDescuento(datos.precio_lista, datos.precio_unitario);
          const total = Total(datos.precio_unitario,datos.sp_cantidad)
          setDatos({ ...datos,precio_total:   total, precio_descuento: desc });}
       
        if(datos.precio_lista === '' || datos.precio_unitario === ''){
          setDatos({ ...datos,precio_descuento:''});
        }

        },[datos.sp_cantidad,datos.precio_lista,datos.precio_unitario])


///CALCULAR PRECIO UNITARIO
      /*===================================================================================================================*/
      useEffect(()=>{
        let precio_u='';
        if (datos.precio_lista !== '' &&  datos.precio_descuento !== ''  &&  validaOperacion ===true) {
          precio_u = precioUnitario(datos.precio_lista, datos.precio_descuento);
          const total = Total(precio_u, datos.sp_cantidad);
          if( datos.precio_descuento < 0 || datos.precio_descuento > 100 ){
          // alert("Advertencia Porcentaje Invalido")
          }
          setDatos({ ...datos, precio_total:total,precio_unitario:precio_u});
        }
      
      },[datos.precio_descuento,datos.precio_lista,datos.sp_cantidad])

      //OBTENER TOTALES

//checar
           /*===================================================================================================================*/
           useEffect(()=>{

            if(datos.precio_unitario === '' || datos.sp_cantidad === ''){
              setDatos({ ...datos,precio_total:''});
            } 
          
          },[,datos.precio_unitario,datos.sp_cantidad])
      

  return (
    <div className="">

      <div>
  {/*       <Animaciones mytext= "Calculadora"/> */}

          <h2>Calculadora</h2>
      </div>


        
<Table >
            <Thead>

      
                <Tr>
                <Th>Calcular</Th>
                <Th>Cantidad</Th>
                <Th>Precio Lista</Th>
                <Th>Precio Unitario</Th>
                <Th> Descuento (%)</Th>
                <Th> Total </Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr className="">
                {/*======================== Cantidad ==========================*/}
                <Td>
                <label className="switch">
                <input type="checkbox" id="checa"     onClick={checa}/>
                <span className="slider"></span>
                </label>   
                </Td>
               
               
                <Td>
                    {" "}
                    <input
                   
                    type="text"
                    name="sp_cantidad"
                    value={datos.sp_cantidad}
                    onChange={handleInputChange}
                    placeholder="Cantidad "
                    
                    />
                </Td>
                {/*======================== Precio Lista ==========================*/}
                <Td>
                    {" "}
                    <input
                    type="text"
                    name="precio_lista"
                    value={datos.precio_lista}
                    onChange={handleInputChange}
                    placeholder="Precio Lista"
                    
                    />
                </Td>

                {/*======================== Precio Unitario ==========================*/}
                <Td>
                    {" "}
                    <input
               
                    type="text"
                    value={datos.precio_unitario}
                    name="precio_unitario"
                    onChange={handleInputChange}
                    placeholder="Precio unitario"
                    step="any"
                    />
                </Td>
                {/*======================== Descuento==========================*/}
                <Td>
                    {" "}
                    <input
              
                    type="text"
                    value={datos.precio_descuento}
                    name="precio_descuento"
                    onChange={handleInputChange}
                    placeholder="Descuento"
                    min="0"
                    step="any"
                    />
                </Td>
                {/*======================== Total ==========================*/}
                <Td>
                    {" "}
                    <input
             type="text"
                    name="precio_total"
                    value={datos.precio_total}
                    readOnly
                    placeholder="Total"
                    step="any"
                    />
                </Td>
                </Tr>
            </Tbody>
            </Table>




    </div>
  )
}

export default CalculaDescuento