import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { useState } from "react";
import axios from 'axios';
import { url2 } from '../../../Componentes/Ocultar';
import Animaciones from '../../../Componentes/Animaciones';
import swal from "sweetalert"



function AdministrarPropuesta(props) {


  const MostrarValidacion=()=>{

 
      swal({
        title: "Validación",
        text: "Se ha Cambiado el Status Exitosamente",
        icon: "success",
        button: "Cerrar"
    
      })
  }



  const [show, setShow] = useState(true)

  // cambio de estatus en el la base de datos del proyecto seleccionado a validado
  async function cambioEstatusProyectoValidad() {
    try {
      const data = {
        proyecto_estatus: 'Aceptado'
      }
      console.log(data)
      const respuesta = await axios.put(url2 + `/api/cotizador/proyecto/updateEstatus/${props.proyId}`, data);
      const send2 = respuesta.data
 /*      console.log(send2) */
/*       alert("Estatus del proyecto actualizado") */
      MostrarValidacion();
    } catch (error) {
      console.log(error)
    }
  }
  // cambio de estatus en el la base de datos del proyecto seleccionado a rechazado
  async function cambioEstatusProyectoRechazado() {
    try {
      const data = {
        proyecto_estatus: 'Rechazado'
      }
      const respuesta = await axios.put(url2 + `/api/cotizador/proyecto/updateEstatus/${props.proyId}`, data);
      const send2 = respuesta.data
     /*  console.log(send2) */
   /*    alert("Estatus del proyecto actualizado") */
      MostrarValidacion();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="">


      <div className="table-responsive">

  <br/>
  <br/>
            <div>
          <Animaciones mytext="Validación" />
        </div>
 
        <Table >
          {/*========================== Titulos Tabla ==========================*/}
          <Thead>


            <Tr >
              {/*    <th>Propuestas</th> */}
              <Th>Rechazar Proyecto</Th>
              <Th>Validar Proyecto</Th>


            </Tr>
          </Thead>
          <Tbody>
            <Tr className="">
              {/*========================== Divisa ==========================*/}
              <Td>

                <button className="btn btn-primary PDF" onClick={() => { cambioEstatusProyectoRechazado() }} type="button"> Rechazar </button>
              </Td>


              <Td>

                <button className="btn btn-primary" onClick={() => { cambioEstatusProyectoValidad() }} type="button"> Validar </button>
              </Td>

            </Tr>
          </Tbody>
        </Table>






      </div>

    </div>
  )
}

export default AdministrarPropuesta