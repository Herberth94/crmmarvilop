import React from 'react'
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Animaciones from "../../../Componentes/Animaciones";
import RegistrarColaboradores from "./AgregarColaborador";
import AdministrarColaboradores from "./AdministrarColaboradores";


function MenuColaboradores() {
        //Habilitar/Deshabilitar tabla del resumen AM
        const [show, setShow] = useState(true)
        const [show2, setShow2] = useState(true)
  return (
 
 
 <div className="contenido-usuarios">


<Animaciones mytext= " Colaboradores" />

{/*========================== Tabla  Categorias ==========================*/}
<Table responsive id="nombreDiv">
  {/*========================== Titulos Tabla ==========================*/}
  <thead>
    <tr className="titulo-tabla-usuarios">
      <th className='ocultar'>Registrar Colaboradores</th>
      <th className='ocultar'>Administrar Colaboradores </th>
    </tr>
  </thead>
  <tbody>
    <tr className="headerPropuesta">
      {/*========================== Divisa ==========================*/}
      <td>
        <button
          className="btn btn-primary modificar"
          type="button"
          onClick={() => {
            setShow(!show);
            setShow2(true);
          }}
        >
          {" "}
          {show ? "Registrar Colaboradores" : "Ocultar"}{" "}
        </button>
        {show ? (
          <div></div>
        ) : (
          <div className="arregla divBuscadorInteligente">
            {/*========================== Llamado al Componente ==========================*/}
             <RegistrarColaboradores/>
          </div>
        )}
      </td>

      <td>
        <button
          className="btn btn-primary modificar"
          type="button"
          onClick={() => {
            setShow2(!show2);
            setShow(true);
          }}
        >
          {" "}
          {show2 ? "Administrar Colaboradores" : "Ocultar"}{" "}
        </button>
        {show2 ? (
          <div></div>
        ) : (
          <div className="arregla">
            {/*========================== Llamado al Componente ==========================*/}
            < AdministrarColaboradores
              estado={false}
            />
          </div>
        )}
      </td>
    </tr>
  </tbody>
</Table>




    </div>
  )
}

export default MenuColaboradores