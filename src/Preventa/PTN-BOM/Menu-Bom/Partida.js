import React, { useEffect, useState } from "react";
import { InsertDatosPartida, pId } from "../Routes/GuardarPartida";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import ModalPtnDatos from "../Routes/ModalPtnDatos";
import axios from 'axios';
import {url2} from '../../../Componentes/Ocultar';
import Animaciones from '../../../Componentes/Animaciones';

let id;
function Partida(props) {
  const { handleInputChangePartida, enviarDatosPartida } = InsertDatosPartida();

  const [modalShow, setModalShow] = useState(false);

  const [modalShow1, setModalShow1] = useState(true)
  const [proyecto_id, Setproyecto_id] = useState([])

  const lista = async (clave) =>{
    //console.log(id);
    try {
      const respuesta = await axios.get(url2 + `/api/cotizador/proyecto/viewModal/${clave}`);
      Setproyecto_id(respuesta.data.reSql)
    
      
    } catch (error) {
      console.log(error)
      
    }
  }
  
  if(pId !== '' && pId !== undefined){
    id = pId;
  } else{
    id = props.clave;
  }
  

  return (
    <div className="padding">
      {/*========================== Nombre Partida ==========================*/}


      <Animaciones mytext="Datos Partida" />

      <form action="" method="post" onSubmit={enviarDatosPartida}>
        <Table >
          <Thead>
            <Tr >
              <Th>Nombre Partida</Th>
              <Th>Descripción </Th>         
              <Th> Partidas Agregadas</Th>
              <Th> Agregar Datos</Th>
            </Tr>
          </Thead>

          <Tbody>
            <Tr className="">
              {/*=======================  Nombre Partida ======================= */}
              <Td>
                <input
                  className=""
                  type="text"
                  name="partida_nombre"
                  onChange={handleInputChangePartida}
                  placeholder="Ingrese Nombre Partida"
                />
              </Td>

              
              {/*=======================  DescripciónPartida ======================= */}
              <Td>
                <input
                  className=""
                  type="text"
                  name="partida_descripcion"
                  onChange={handleInputChangePartida}
                  placeholder="ingrese Descripción Partida"
                />
              </Td>



              <Td width={"100px"}>


      <button type="button" className="sn-boton" onClick={() => {setModalShow(true);  lista (id)}} >
        <i class="bi bi-eye-fill"></i>
        </button>
      {modalShow && modalShow1 ?   
      <ModalPtnDatos
      show={modalShow}
      proyecto_id={proyecto_id}
      onHide={() => setModalShow(false)}  
     
      />
         :  ''  } 
              </Td>



              <Td width={"100px"}>
                <button className="sn-boton ">
                <i class="bi bi-send"></i>
                </button>
              </Td>
              {/*========================== Botón Agregar Partidas ==========================*/}
            </Tr>
          </Tbody>
        </Table>


        </form>

        <br/>
        <br/>
        
    </div>
  );
}

export default Partida;
