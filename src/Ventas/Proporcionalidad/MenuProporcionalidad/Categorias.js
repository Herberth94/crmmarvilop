import React from 'react'
import Animaciones from "../../../Componentes/Animaciones";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { categoriasUnicas,   totalCategoriasUSD2  , stringDolar  , precioVenta3 } 
     from "../../Operaciones/OperacionesAM";




function Categorias() {
  return (
    
    <div className="contenido-usuarios">

       <br/>
<div>

     <Animaciones  mytext="Categorias" />
</div>
          {/*   <div> <Animaciones mytext="Resumen Categorias" /> </div>
  */}
            <Table>
                <Thead>

                    {/*=================== Titulos Tabla Clientes ===================*/}
                    <Tr >
                        <Th>Descripción</Th>
                        <Th > Total </Th>
                        <Th > Total Precio Venta </Th>
                        <Th > Divisa </Th>
                     {/*    <th>  % </th>
                        <th>Proporcional MESA DE AYUDA </th>
                        <th>TOTAL</th>
                        <th>TOTAL MENSUAL</th>
                        <th>Financiamiento</th>
                        <th>Editar</th> */}
                    </Tr>
                </Thead>
                <Tbody>
                    {/*=================== Contenido Tabla Clientes =================*/}

                    {Object.keys(categoriasUnicas).map((key) => (
                        <Tr key={key}>
                            
                            {/*================= Descripción  ==================*/}
                            <Td>{categoriasUnicas[key]}</Td>

                            <Td>{"$ "}{totalCategoriasUSD2[key]}</Td>


                        
                            <Td  className='azul'>{"$ "}{precioVenta3[key]}</Td>



                        {/*    <td>{"$ "}{precioVenta[(partidasUnicas.length - 1) + parseFloat(key)]}</td>
 */}
                            <Td >{stringDolar}</Td>
                            {/*================= Precio Venta ==================*/}
                          
                        </Tr>
                    ))}
                </Tbody>
            </Table>




        
    </div>
  )
}

export default Categorias