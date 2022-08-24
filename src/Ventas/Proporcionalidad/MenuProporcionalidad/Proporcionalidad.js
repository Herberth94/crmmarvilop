import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import Animaciones from "../../../Componentes/Animaciones";

import {TOTAL, proporcional ,  proporcionalMesaAyuda,  partidasUnicas,  precioVenta2 ,
     totalMensual , financiamiento} 
     from "../../Operaciones/OperacionesAM";



function Proporcionalidad() {

  
  return (
    
    
    <div className="">

        <br/>
        <br/>



        <div>
            <Animaciones mytext="Proporcionalidad" />
        </div>


{/* 
            <div> <Animaciones mytext="Resumen Proporcionalmente" /> </div>
  */}
            <Table >
                <Thead>

        
                    {/*=================== Titulos Tabla Clientes ===================*/}
                    <Tr >
                        <Th>Descripción</Th>
                        <Th >Precio Venta </Th>
                        <Th> % </Th>
                        <Th>Proporcionalidad</Th>
                        <Th>TOTAL</Th>
                        <Th>TOTAL MENSUAL</Th>
                        <Th>Financiamiento</Th>
                     
                    </Tr>
                </Thead>
                <Tbody>
                    {/*=================== Contenido Tabla Clientes =================*/}

                    {Object.keys(partidasUnicas).map((key) => (
                        <Tr key={key}>
                            
                            {/*================= Descripción  ==================*/}

                            <Td>{partidasUnicas[key]}</Td>


                            <Td>{"$ "}{precioVenta2[key]}</Td>
                            {/*================= Precio Venta ==================*/}
                            <Td className="azul" >{proporcional[key]} {" % "}  </Td>

                          {/*=================  % ==================*/}
                      

                         {/*================= Proporcional Mesa de Ayuda==================*/}
                            <Td>  {"$ "}{ proporcionalMesaAyuda[key]}</Td>

                            {/*================= Total ==================*/}

                            <Td className="azul"> {"$ "} {TOTAL[key]} </Td>

                  {/*================= Total Mensual ==================*/}
                  <Td className=""> {"$ "} {totalMensual[key]}</Td>

                    {/*================= Financiamiento ==================*/}
                            <Td> {"$ "} {financiamiento[key]}</Td>
                                {/*================= eDITARF==================*/}   
                          
                        </Tr>
                    ))}
                </Tbody>
            </Table>




<br/>
<br/>

        
    </div>
  )
}

export default Proporcionalidad